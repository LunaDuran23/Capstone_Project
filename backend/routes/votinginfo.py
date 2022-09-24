from fastapi import APIRouter
from backend.common.common import CANDIDATE_COLLECTION, FACULTY_COLLECTION, VOTING_LIST_COLLECTION
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
