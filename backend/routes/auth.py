from fastapi import APIRouter, Body, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from backend.data.model import UserIn, UserOut, UserUpdate, BaseResponse
from backend.common.types import RequestWithDB
from backend.data.model.user import UserDB

router = APIRouter()

AUTH_USER_COLLECTION = "users"


@router.post("/register",
             response_description="Register a new user",
             status_code=status.HTTP_201_CREATED,
             response_model=BaseResponse[UserOut])
def register_user(request: RequestWithDB, user: UserIn = Body(...)):

    # Verify if user is already registered!

    # Hash password!
    hashpass = "hashed+" + user.password
    new_user = user.dict()

    # add votedIn, add hashpassword
    new_user["password"] = hashpass
    new_user["votedIn"] = []

    new_user = UserDB.parse_obj(new_user)  # verify model is ok

    res = request.app.database[AUTH_USER_COLLECTION].insert_one(
        jsonable_encoder(new_user))
    new_user = request.app.database[AUTH_USER_COLLECTION].find_one(
        {"_id": res.inserted_id}
    )

    # if need to do something else with it (link votes, etc)
    new_user = UserDB.parse_obj(new_user)

    return BaseResponse(success=True, payload=new_user)


@router.put("/update/{id}",
            response_description="Update a book",
            response_model=BaseResponse[UserUpdate]
            )
def update_user_info(id: str, request: RequestWithDB, userfields: UserUpdate = Body(...)):
    non_noneuserfields = {k: v for k,
                          v in userfields.dict().items() if v is not None}
    if len(non_noneuserfields) >= 1:
        update_result = request.app.database[AUTH_USER_COLLECTION].update_one(
            {"_id": id}, {"$set": non_noneuserfields}
        )
        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {id} not found")

    existing_updated = request.app.database[AUTH_USER_COLLECTION].find_one({
                                                                           "_id": id})
    if existing_updated is not None:
        return BaseResponse(success=True, payload=existing_updated)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"User with ID {id} not found")
