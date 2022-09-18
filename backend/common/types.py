from sqlite3 import dbapi2
from typing import Optional
from fastapi import FastAPI, Request
from pymongo import MongoClient
from pymongo.database import Database
from pydantic.main import ModelMetaclass


class FastAPIWithDB(FastAPI):
    '''Extension of FastAPI App to receive type hinting'''

    def _get_client(self) -> MongoClient:
        return self.__client

    def _set_client(self, client):
        if not isinstance(client, MongoClient):
            raise TypeError("Database must be initialized with MongoDBClient")
        self.__client = client

    mongodb_client = property(_get_client, _set_client)

    def _get_database(self) -> Database:
        return self.__database

    def _set_database(self, db):
        if not isinstance(db, Database):
            raise TypeError("Database must be initialized with MongoDatabase!")
        self.__database = db

    database = property(_get_database, _set_database)

    def _get_secret_key(self) -> str:
        return self.__secret_key

    def _set_secret_key(self, key):
        if not isinstance(key, str):
            raise TypeError("Secret key must be initialized as a string!")
        self.__secret_key = key

    secret_key = property(_get_secret_key, _set_secret_key)


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


UUIDRef = str
