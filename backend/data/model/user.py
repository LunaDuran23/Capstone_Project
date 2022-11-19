from uuid import uuid4
from typing import Literal, List
from pydantic import BaseModel, Field, EmailStr
from pydantic.error_wrappers import ValidationError
from backend.common.types import AllOptional, BaseIDModel, UUIDRef
from datetime import date
from fastapi import HTTPException
from fastapi import Form
import json


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

    @classmethod
    def as_form(cls,
                email: EmailStr = Form(),
                password: str = Form(),
                name: str = Form(),
                surname: str = Form(),
                universityID: int = Form(),
                gender: Literal["M", "F"] = Form(),
                dateOfBirth: date = Form(),
                faculty: int = Form(),
                semester: int = Form(),
                ):
        try:
            return cls(
                email=email,
                password=password,
                name=name,
                surname=surname,
                universityID=universityID, gender=gender,
                dateOfBirth=dateOfBirth, faculty=faculty, semester=semester
            )
        except ValidationError as e:
            raise HTTPException(422, detail=json.loads(e.json()))
# Ensure DB inherits from all of those so it has all the information


class UserDB(UserIn, BaseIDModel):
    # list of voting rounds in which he has voted in
    votedIn: List[UUIDRef] = Field(...)
    imgPath: str

# only updatable fields from UserBase


class UserUpdate(UserBase, metaclass=AllOptional):
    pass

# Replies only name and username


class UserOut(UserDB):
    class Config:
        fields = {'password': {'exclude': True},
                  'imgPath': {'exclude': True},
                  'id': {'exclude': True}}
