from backend.common.types import BaseIDModel, UUIDRef
from typing import List
from pydantic import BaseModel


class VotingUrn(BaseIDModel):
    choices: List[UUIDRef]
    currentVotes: List[int]
    blankVotes: int

    # statistics information
    maleVotes: List[int]
    femaleVotes: List[int]


class VotingRound(BaseIDModel):
    round_id: int
    faculty_id: int
    presidential_urn: UUIDRef  # references to voting urns
    semestral_urns: List[UUIDRef]  # one per semester
