from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient
from backend.common.common import API_PREFIX, AUTH_PREFIX, USER_PREFIX
from backend.common.types import FastAPIWithDB
from backend.routes import auth_router, user_router
from fastapi import APIRouter

globalRouter = APIRouter()
config = dotenv_values(".env")
app = FastAPIWithDB()


@app.on_event("startup")
def startup_db_client():
    # Check for env variables
    if (
            config["DB_NAME"] is None or
            config["DB_USER"] is None or
            config["DB_USER_PASS"] is None or
            config["SECRET_KEY_HEX"] is None):
        raise RuntimeError("Missing environment variables! Refer to readme.md")
    app.mongodb_client = MongoClient(config["MONGO_URI"],
                                     username=config["DB_USER"],
                                     password=config["DB_USER_PASS"],
                                     authSource=config["DB_NAME"])

    app.database = app.mongodb_client[config["DB_NAME"]]

    helloresp = app.mongodb_client.admin.command("hello")

    if not helloresp["isWritablePrimary"]:
        raise RuntimeError("Database is not in writable mode! Not proceeding")

    if helloresp["readOnly"]:
        raise RuntimeError("Database is readonly!")

    app.secret_key = config["SECRET_KEY_HEX"]
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


globalRouter.include_router(
    auth_router, tags=["auth"], prefix=AUTH_PREFIX
)

globalRouter.include_router(
    user_router, tags=["user"], prefix=USER_PREFIX
)

app.include_router(globalRouter, prefix=API_PREFIX)
