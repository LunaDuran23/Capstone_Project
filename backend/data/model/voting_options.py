from pydantic import BaseModel
from backend.data.model.candidate import CandidateOut
from typing import List


class PresPair(BaseModel):
    president: CandidateOut
    vicepresident: CandidateOut


class VotingOptions(BaseModel):
    presidential: List[PresPair]
    semester: List[CandidateOut]
