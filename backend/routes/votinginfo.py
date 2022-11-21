from fastapi import APIRouter
from backend.common.common import (
    CANDIDATE_COLLECTION, FACULTY_COLLECTION,
    VOTING_LIST_COLLECTION, VOTING_ROUND_COLLECTION, VOTING_URNS_COLLECTION
)
from backend.common.types import RequestWithDB
from typing import List
from backend.data.model import VotingListOut, BaseResponse, Candidate, FacultyOut
from backend.utils.outencoder import out_encoder

router = APIRouter()


@router.get("/faculties/",
            summary="Get Faculties",
            description="Gets a list of all the faculties",
            response_description="The list of all the faculties",
            response_model=BaseResponse[List[FacultyOut]],
            response_model_exclude_none=True
            )
def get_faculties(request: RequestWithDB):
    # get all faculties
    faculties = list(request.app.database[FACULTY_COLLECTION].find({}))
    return BaseResponse(success=True, payload=out_encoder(faculties), msg="")


@router.get("/get_voting_lists",
            summary="Get Voting Lists",
            description="Gets a list of all voting lists from specified faculty.",
            response_description="The list of all voting lists from the specified faculty.",
            response_model=BaseResponse[List[VotingListOut]],
            response_model_exclude_none=True)
def get_faculty_voting_lists(faculty_id: int, request: RequestWithDB):
    # get all voting lists with given faculty id
    voting_lists = list(request.app.database[VOTING_LIST_COLLECTION].find(
        {"faculty_id": faculty_id}))
    return BaseResponse(success=True, payload=out_encoder(voting_lists), msg="")


@router.get("/get_candidates",
            summary="Get Candidates",
            description="Gets a list of all voting lists candidates",
            response_description="The list of all candidates from the given voting list.",
            response_model=BaseResponse[List[Candidate]],
            response_model_exclude_none=True,
            )
def get_candidates(voting_list_id: int, request: RequestWithDB):
    candidates = list(request.app.database[CANDIDATE_COLLECTION].find(
        {"voting_list_id": voting_list_id}))
    return BaseResponse(success=True, msg="", payload=out_encoder(candidates))


@router.get("/get_proposals",
            summary="Get proposals",
            description="Get proposals of the given voting list",
            response_description="The list of proposals from the given voting list.",
            response_model=BaseResponse[List[str]]
            )
def get_proposals(voting_list_id: int, request: RequestWithDB):
    voting_list = request.app.database[VOTING_LIST_COLLECTION].find_one(
        {"voting_list_id": voting_list_id})

    if voting_list is None:
        return BaseResponse(success=False, payload=[],
                            msg="Voting list with given ID doesn't exist!")

    return BaseResponse(success=True, msg="", payload=voting_list["proposals"])


@router.get(
    "/get_current_round_status",
    summary="Get Round Status",
    description="Get the current vote status for the given round id",
)
def get_voting_results(round_id: int, request: RequestWithDB):
    voting_urn = request.app.database[VOTING_ROUND_COLLECTION].find_one(
        {"round_id": round_id})

    if voting_urn is None:
        return BaseResponse(
            success=False, payload=None,
            msg="Voting round with given ID doesn't exist!")

    def urn_to_list(urnid):
        # get urn
        found_urn = request.app.database[VOTING_URNS_COLLECTION].find_one({
            "_id": urnid})
        if found_urn is None:
            return BaseResponse(success=False, payload=None, msg="Failed to get urn results!")
        # map urn candidate names to their votes
        urnlist = []
        for i in range(len(found_urn["choices"])):
            votecount = found_urn["currentVotes"][i]
            choice = found_urn["choices"][i]
            candidate = request.app.database[CANDIDATE_COLLECTION].find_one(
                {'_id': choice})
            if candidate is None:
                return BaseResponse(success=False, payload=None, msg="Failed to get urn results!")
            urnlist.append(
                {'name': candidate['name'] + ' ' + candidate['surname'], 'votes': votecount})
        return urnlist

    resp_dict = {}
    presurn = voting_urn['presidential_urn']
    resp_dict["formula"] = urn_to_list(presurn)
    resp_dict["Primer Semestre"] = urn_to_list(voting_urn['semestral_urns'][0])
    resp_dict["Segundo Semestre"] = urn_to_list(
        voting_urn['semestral_urns'][1])
    resp_dict["Tercer Semestre"] = urn_to_list(voting_urn['semestral_urns'][2])
    resp_dict["Cuarto Semestre"] = urn_to_list(voting_urn['semestral_urns'][3])
    resp_dict["Quinto Semestre"] = urn_to_list(voting_urn['semestral_urns'][4])
    resp_dict["Sexto Semestre"] = urn_to_list(voting_urn['semestral_urns'][5])
    resp_dict["Septimo Semestre"] = urn_to_list(
        voting_urn['semestral_urns'][6])
    resp_dict["Octavo Semestre"] = urn_to_list(voting_urn['semestral_urns'][7])

    return BaseResponse(success=True, msg="", payload=resp_dict)


@router.get(
    "/get_all_round_status",
    summary="Get All Rounds Status",
    description="Get the current vote status ALL rounds. Keys will be displayed by the faculty name of the round",
)
def get_all_voting_results(request: RequestWithDB):
    all_rounds = list(request.app.database[VOTING_ROUND_COLLECTION].find({}))
    respdict = {}
    for round in all_rounds:
        # get faculty name
        faculty_id = round["faculty_id"]
        faculty = request.app.database[FACULTY_COLLECTION].find_one(
            {'faculty_id': faculty_id})
        if faculty is None:
            return BaseResponse(success=False, msg="Internal Server error fail! Broken voting round.", payload=None)
        roundinfo = get_voting_results(
            round["round_id"], request).payload

        respdict[faculty['name']] = roundinfo
    return BaseResponse(success=True, msg="", payload=respdict)
