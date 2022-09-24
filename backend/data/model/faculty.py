from typing import List
from backend.common.types import BaseIDModel, UUIDRef


class FacultyOut(BaseIDModel):
    faculty_id: int  # Unique identifier
    name: str
    imgPath: str


class Faculty(FacultyOut):
    voting_lists: List[UUIDRef]
