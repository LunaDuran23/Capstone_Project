from fastapi import APIRouter
from backend.common.common import (
    CANDIDATE_COLLECTION, VOTING_LIST_COLLECTION, VOTING_ROUND_COLLECTION,
    VOTING_URNS_COLLECTION, AUTH_USER_COLLECTION)
from backend.common.types import RequestWithDB
from typing import List
from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from backend.data.model import (
    BaseResponse, VotingRound, VotingUrn,
    UserToken, VotingOptions, PresPair
)
from backend.data.model.candidate import Candidate
from backend.routes.middlewares.auth import authenticated_user
from fastapi import Form, UploadFile
from backend.utils.face_compare import isSamePerson

router = APIRouter()

# This for now, will override the voting round
# and voting round will be kept as a singleton.

# for now it will delete all previous things from voting collections everytime a round is created.
DELETE_PREVIOUS_VOTING_HISTORY = True


@router.post(
    "/create-voting-round",
    summary="Create voting round",
    description="Create voting round of faculty id with currently active candidates in database.",
    response_model=BaseResponse[bool],
    response_model_exclude_none=True,
)
def create_voting_round(faculty_id: int, request: RequestWithDB):
    round_collections = request.app.database[VOTING_ROUND_COLLECTION]
    urns_collections = request.app.database[VOTING_URNS_COLLECTION]
    candidates_collections = request.app.database[CANDIDATE_COLLECTION]
    list_collections = request.app.database[VOTING_LIST_COLLECTION]

    if DELETE_PREVIOUS_VOTING_HISTORY:  # any
        round_collections.delete_many({})
        urns_collections.delete_many({})

    '''
    Presidential URN creation.
    '''
    # get all lists for that faculty:
    voting_lists_available = list(
        list_collections.find({"faculty_id": faculty_id}))
    # get all presidential candidates from those list
    presidentialcandidates = candidates_collections.find({
        "$and": [
            {"voting_list_id": {"$in": [x["voting_list_id"]
                                        for x in voting_lists_available]}},
            {"status": "President"},
        ]
    })

    presidentialcandidates = list(presidentialcandidates)

    emptyvotes = [0] * len(presidentialcandidates)

    # it is important that order is preserved from now!
    presidential_urn = VotingUrn(
        choices=[x["_id"] for x in presidentialcandidates],
        currentVotes=emptyvotes,
        maleVotes=emptyvotes,
        femaleVotes=emptyvotes,
        blankVotes=0,
    )

    # enter presidential_urn into database.
    inserted_urn = urns_collections.insert_one(
        jsonable_encoder(presidential_urn))
    presidential_urn_ref = inserted_urn.inserted_id

    '''
    SEMESTER URN CREATION
    '''
    new_urns = []
    # now get all semester candidates from each one of those lists:
    for i in range(1, 9):
        semestral_candidates = list(candidates_collections.find({
            "$and": [
                {"voting_list_id": {"$in": [x["voting_list_id"]
                                            for x in voting_lists_available]}},
                {"semester": i},
            ]
        }))

        emptyvotes = [0] * len(semestral_candidates)  # blank vote
        urn = VotingUrn(choices=[x["_id"] for x in semestral_candidates],
                        currentVotes=emptyvotes, femaleVotes=emptyvotes, maleVotes=emptyvotes, blankVotes=0)
        new_urns.append(urn)

    # insert urns into db
    res = urns_collections.insert_many(jsonable_encoder(new_urns))

    new_urns_refs = res.inserted_ids
    # actually create the whole voting round
    newround = VotingRound(round_id=0, faculty_id=faculty_id,
                           presidential_urn=presidential_urn_ref, semestral_urns=new_urns_refs)

    # insert round
    round_collections.insert_one(jsonable_encoder(newround))
    return BaseResponse(success=True, msg="", payload=True)


@router.get(
    "/get-voting-otpions",
    summary="Get voting options",
    description="Returns valid voting options, as a list of candidates",
    response_model=BaseResponse[VotingOptions],
    response_model_exclude_none=True,
)
def get_voting_options(request: RequestWithDB, user: UserToken = Depends(authenticated_user)):

    # find for user
    founduser = request.app.database[AUTH_USER_COLLECTION].find_one(
        {"email": user.email}
    )

    if (founduser is None):
        return BaseResponse(success=False, msg="Invalid user token", payload=None)

    # find voting rounds available
    votinground = request.app.database[VOTING_ROUND_COLLECTION].find_one(
        {"faculty_id": founduser["faculty"]}
    )

    if votinground is None:
        return BaseResponse(success=False, msg="No active rounds to vote!", payload=None)

    round = VotingRound.parse_obj(votinground)

    urns_collection = request.app.database[VOTING_URNS_COLLECTION]
    candidates_collection = request.app.database[CANDIDATE_COLLECTION]

    pres_urn = VotingUrn.parse_obj(
        urns_collection.find_one({"_id": str(round.presidential_urn)})
    )

    # find presidential pairs, of voting round options
    pres_pairs = []
    for choice in pres_urn.choices:
        pres_cand = Candidate.parse_obj(
            candidates_collection.find_one({"_id": str(choice)}))

        vice_cand = Candidate.parse_obj(
            candidates_collection.find_one(
                {"voting_list_id": pres_cand.voting_list_id,
                 "status": "Vicepresident"}
            ))
        pres_pairs.append(
            PresPair(president=pres_cand, vicepresident=vice_cand)
        )

    # now simply give options of semester
    semester_urn = VotingUrn.parse_obj(
        urns_collection.find_one({
            "_id": str(round.semestral_urns[founduser["semester"] - 1])
        })
    )

    semester_candidates = []
    for choice in semester_urn.choices:
        candidate = Candidate.parse_obj(candidates_collection.find_one(
            {"_id": str(choice)}
        ))
        semester_candidates.append(candidate)

    optionsToVote = VotingOptions(
        presidential=pres_pairs, semester=semester_candidates)

    return BaseResponse(success=True, msg="", payload=optionsToVote)


@router.post(
    "/cast-vote",
    summary="Casts Vote",
    description="Casts a vote according to index selection. Order matters so be careful!, Send -1 for blank Vote",
    response_model=BaseResponse[bool],
    response_model_exclude_none=True,
)
async def cast_vote(request: RequestWithDB,
                    img_verification: UploadFile,
                    pres_choice: int = Form(),
                    semester_choice: int = Form(),
                    user: UserToken = Depends(authenticated_user)):

    # find for user
    founduser = request.app.database[AUTH_USER_COLLECTION].find_one(
        {"email": user.email}
    )

    if (founduser is None):
        return BaseResponse(success=False, msg="Invalid user token", payload=None)

    # find voting rounds available
    votinground = request.app.database[VOTING_ROUND_COLLECTION].find_one(
        {"faculty_id": founduser["faculty"]}
    )

    if votinground is None:
        return BaseResponse(success=False, msg="No active rounds to vote!", payload=None)

    round = VotingRound.parse_obj(votinground)

    # check if user has already voted in this round
    if round.id in founduser["votedIn"]:
        return BaseResponse(success=False, msg="El usuario ya ha votado anteriormente!", payload=None)

    # perform image verifications
    path_to_stored_carnet = founduser["imgPath"]
    given_img = await img_verification.read()

    with open('privatestatic/temp.png', 'wb') as file:
        file.write(given_img)

    try:
        if not isSamePerson(path_to_stored_carnet, 'privatestatic/temp.png'):
            return BaseResponse(success=False, msg="Verificación facial incorrecta!", payload=None)
    except BaseException as ex:
        print("Exception caught: ", ex)

    urns_collection = request.app.database[VOTING_URNS_COLLECTION]
    pres_urn = urns_collection.find_one({"_id": str(round.presidential_urn)})
    semestral_urn = urns_collection.find_one(
        {"_id": str(round.semestral_urns[founduser["semester"] - 1])}
    )

    if pres_urn is None or semestral_urn is None:
        return BaseResponse(success=False, msg="Broken votations, contact admin", payload=False)

    # validate choice indexes
    if not (-1 <= pres_choice < len(pres_urn["currentVotes"])):
        return BaseResponse(success=False, msg="Invalid vote index!", payload=False)

    if not (-1 <= semester_choice < len(semestral_urn["currentVotes"])):
        return BaseResponse(success=False, msg="Invalid vote index!", payload=False)

    def updateUrn(urndict, vote_index: int):
        if (vote_index == -1):
            urndict["blankVotes"] += 1
        else:
            urndict["currentVotes"][vote_index] += 1

            if founduser["gender"] == "M":
                urndict["maleVotes"][vote_index] += 1
            else:
                urndict["femaleVotes"][vote_index] += 1

    updateUrn(pres_urn, pres_choice)
    updateUrn(semestral_urn, semester_choice)

    # update values in db again
    urns_collection.update_one(
        {"_id": pres_urn["_id"]},
        {"$set": pres_urn},
    )

    urns_collection.update_one(
        {"_id": semestral_urn["_id"]},
        {"$set": semestral_urn},
    )

    # Update user as he has already cast his vote!
    request.app.database[AUTH_USER_COLLECTION].update_one(
        {"_id": founduser["_id"]},
        {"$push": {"votedIn": str(votinground["_id"])}}
    )

    return BaseResponse(success=True, msg="", payload=True)
