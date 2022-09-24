from typing import Literal, Optional
from fastapi import FastAPI, Request
from pymongo import MongoClient
from pymongo.database import Database
from pydantic import Field
from pydantic.main import ModelMetaclass, BaseModel
from uuid import UUID, uuid4


class FastAPIWithDB(FastAPI):
    '''Extension of FastAPI App to receive type hinting'''

    @property
    def mongodb_client(self) -> MongoClient:
        return self.__client

    def set_mongo_client(self, client: MongoClient):
        if not isinstance(client, MongoClient):
            raise TypeError("Database must be initialized with MongoDBClient")
        self.__client = client

    # mongodb_client = property(_get_client, _set_client)

    @property
    def database(self) -> Database:
        return self.__database

    def set_database(self, db: Database):
        if not isinstance(db, Database):
            raise TypeError("Database must be initialized with MongoDatabase!")
        self.__database = db

    @property
    def secret_key(self) -> str:
        return self.__secret_key

    def set_secret_key(self, key: str):
        if not isinstance(key, str):
            raise TypeError("Secret key must be initialized as a string!")
        self.__secret_key = key


class RequestWithDB(Request):
    '''Extension of FastAPI Request to receive type hinting on app property'''
    @property
    def app(self) -> FastAPIWithDB:
        return self.app


class AllOptional(ModelMetaclass):
    def __new__(cls, name, bases, namespaces, **kwargs):
        annotations = namespaces.get('__annotations__', {})
        for base in bases:
            annotations.update(base.__annotations__)
        for field in annotations:
            if not field.startswith('__'):
                annotations[field] = Optional[annotations[field]]
        namespaces['__annotations__'] = annotations
        return super().__new__(cls, name, bases, namespaces, **kwargs)


class BaseIDModel(BaseModel):
    id: str = Field(default_factory=uuid4, alias="_id")

    class Config:
        allow_population_by_field_name = True


UUIDRef = UUID
CandidateStatus = Literal["President", "Vicepresident", "Semester"]
