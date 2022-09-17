from typing import Optional, TypeVar, Generic
from pydantic import Field
from pydantic.generics import GenericModel


T = TypeVar("T")


class BaseResponse(GenericModel, Generic[T]):
    success: bool = Field(...)
    payload: Optional[T]
