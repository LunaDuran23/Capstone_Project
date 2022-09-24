from typing import List
from pydantic import BaseModel
from backend.common.types import BaseIDModel, UUIDRef


# class Proposal(BaseModel):
#     title: str
#     description: str


class VotingListOut(BaseIDModel):
    voting_list_id: int
    name: str
    faculty_id: int
    proposals: List[str]
    imgPath: str


class VotingList(VotingListOut):
    candidates: List[UUIDRef]
