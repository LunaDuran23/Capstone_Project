import uuid
from typing import Literal, Optional, List
from pydantic import BaseModel, Field, EmailStr
from backend.common.types import AllOptional, UUIDRef
from datetime import date


class UserBase(BaseModel):
    name: str = Field(...)
    surname: str = Field(...)
    cellphone: str = Field(...)
    universityID: int = Field(...)
    gender: Literal["M", "F"] = Field(...)
    dateOfBirth: date = Field(...)  # YY-MM-DD format


class UserIn(UserBase):
    email: EmailStr = Field(...)
    password: str = Field(...)


class UserDB(UserIn):  # Ensure DB inherits from all of those so it has all the information
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    votedIn: List[UUIDRef] = Field(...)

# only updatable fields from UserBase


class UserUpdate(UserBase, metaclass=AllOptional):
    pass

# Replies only name and username


class UserOut(BaseModel):
    name: str = Field(...)
    surname: str = Field(...)
