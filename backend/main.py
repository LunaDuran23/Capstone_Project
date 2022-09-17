from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient
from backend.routes.auth import router as auth_router
from fastapi import APIRouter
from pymongo.errors import OperationFailure

globalRouter = APIRouter()
config = dotenv_values(".env")
app = FastAPI()


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["MONGO_URI"],
                                     username=config["DB_USER"],
                                     password=config["DB_USER_PASS"],
                                     authSource=config["DB_NAME"])

    app.database = app.mongodb_client[config["DB_NAME"]]
    app.mongodb_client.auth
    helloresp = app.mongodb_client.admin.command("hello")

    if not helloresp["isWritablePrimary"]:
        raise RuntimeError("Database is not in writable mode! Not proceeding")

    if helloresp["readOnly"]:
        raise RuntimeError("Database is readonly!")

    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


globalRouter.include_router(
    auth_router, tags=["auth"], prefix="/auth")

app.include_router(globalRouter, prefix="/api")
