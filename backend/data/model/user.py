from uuid import uuid4
from typing import Literal, List
from pydantic import BaseModel, Field, EmailStr
from backend.common.types import AllOptional, BaseIDModel, UUIDRef
from datetime import date


class UserBase(BaseModel):
    name: str = Field(...)
    surname: str = Field(...)
    universityID: int = Field(...)  # CC UNIQUE
    gender: Literal["M", "F"] = Field(...)
    dateOfBirth: date = Field(...)  # YY-MM-DD format
    faculty: int
    semester: int = Field(..., ge=1, le=8)


class UserIn(UserBase):
    email: EmailStr = Field(...)
    password: str = Field(...)


# Ensure DB inherits from all of those so it has all the information
class UserDB(UserIn, BaseIDModel):
    # list of voting rounds in which he has voted in
    votedIn: List[UUIDRef] = Field(...)
    # imgPath: str

# only updatable fields from UserBase


class UserUpdate(UserBase, metaclass=AllOptional):
    pass

# Replies only name and username


class UserOut(UserDB):
    class Config:
        fields = {'password': {'exclude': True},
                  'id': {'exclude': True}}
