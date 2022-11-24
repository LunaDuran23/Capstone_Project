from dotenv import dotenv_values
from pymongo import MongoClient
from backend.common.common import API_PREFIX, AUTH_PREFIX, USER_PREFIX, INFO_PREFIX, VOTING_PREFIX
from backend.common.types import FastAPIWithDB
from backend.utils.unique_initialize_db import initialize_unique_indexes
from backend.routes import auth_router, user_router, votinginforouter, votingrouter
from backend.routes.middlewares import LimitUploadSize
from fastapi import APIRouter
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware


globalRouter = APIRouter()
config = dotenv_values(".env")
app = FastAPIWithDB()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Limit uploads to 4mb
app.add_middleware(LimitUploadSize, max_upload_size=4_000_000)


@app.on_event("startup")
def startup_db_client():
    # Check for env variables
    if (
            config["DB_NAME"] is None or
            config["DB_USER"] is None or
            config["DB_USER_PASS"] is None or
            config["SECRET_KEY_HEX"] is None):
        raise RuntimeError("Missing environment variables! Refer to readme.md")
    app.set_mongo_client(MongoClient(config["MONGO_URI"],
                                     username=config["DB_USER"],
                                     password=config["DB_USER_PASS"],
                                     authSource=config["DB_NAME"]))

    app.set_database(app.mongodb_client[config["DB_NAME"]])

    helloresp = app.mongodb_client.admin.command("hello")

    if not helloresp["isWritablePrimary"]:
        raise RuntimeError("Database is not in writable mode! Not proceeding")

    if helloresp["readOnly"]:
        raise RuntimeError("Database is readonly!")

    # Initialize unique indexes
    initialize_unique_indexes(app.database)

    app.set_secret_key(config["SECRET_KEY_HEX"])

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

globalRouter.include_router(
    votinginforouter, tags=["info"], prefix=INFO_PREFIX
)

globalRouter.include_router(
    votingrouter, tags=["voting"], prefix=VOTING_PREFIX
)

app.include_router(globalRouter, prefix=API_PREFIX)
# include static files last
app.mount("/", StaticFiles(directory="static", html=True), name="static")
