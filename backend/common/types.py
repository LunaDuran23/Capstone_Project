from typing import Optional
from fastapi import FastAPI, Request
from pymongo.database import Database
from pydantic.main import ModelMetaclass


class FastAPIWithDB(FastAPI):
    '''Extension of FastAPI App to receive type hinting on database property'''
    @property
    def database(self) -> Database:
        return super(FastAPIWithDB, self).database


class RequestWithDB(Request):
    '''Extension of FastAPI Request to receive type hinting on app property'''
    @property
    def app(self) -> FastAPIWithDB:
        return super(RequestWithDB, self).app


class AllOptional(ModelMetaclass):
    def __new__(self, name, bases, namespaces, **kwargs):
        annotations = namespaces.get('__annotations__', {})
        for base in bases:
            annotations.update(base.__annotations__)
        for field in annotations:
            if not field.startswith('__'):
                annotations[field] = Optional[annotations[field]]
        namespaces['__annotations__'] = annotations
        return super().__new__(self, name, bases, namespaces, **kwargs)


UUIDRef = str
