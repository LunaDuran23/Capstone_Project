from pydantic import BaseModel
from backend.common.types import BaseIDModel, CandidateStatus


class CandidateOut(BaseModel):
    name: str
    surname: str
    voting_list_id: int
    description: str
    semester: int
    status: CandidateStatus
    imgPath: str


class Candidate(CandidateOut, BaseIDModel):
    pass
