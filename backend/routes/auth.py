from fastapi import APIRouter, Body, status, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm
from backend.common.common import AUTH_USER_COLLECTION, JWT_ALGORITHM, TOKEN_URL, ACCESS_TOKEN_EXPIRE_MINUTES
from backend.data.model import UserIn, UserOut, AuthToken, BaseResponse, UserDB, UserToken
from backend.common.types import RequestWithDB
from backend.utils import bcrypt_hash_password, verify_hash_password
import jwt
from datetime import datetime, timedelta

router = APIRouter()


@router.post("/register",
             response_description="Register a new user",
             status_code=status.HTTP_201_CREATED,
             response_model=BaseResponse[UserOut],
             response_model_exclude_none=True,
             )
def register_user(request: RequestWithDB, user: UserIn = Body(...)):

    # First perform any input validation (length, phone, email etc)
    # Although these should ideally be performed using pydantic validators

    users_collection = request.app.database[AUTH_USER_COLLECTION]

    # Verify if user is already registered! (if any email or universityID) exists
    if users_collection.find_one(
        {'$or': [{'email': user.email}, {'universityID': user.universityID}]}
    ) is not None:
        return BaseResponse(success=False, msg="User already exists!", payload=None)

    # Hash password!

    hashpass = bcrypt_hash_password(user.password)
    new_user = user.dict()

    # add votedIn, add hashpassword
    new_user["password"] = hashpass
    new_user["votedIn"] = []

    new_user = UserDB.parse_obj(new_user)  # verify model is ok

    res = users_collection.insert_one(
        jsonable_encoder(new_user))
    new_user = users_collection.find_one(
        {"_id": res.inserted_id}
    )

    # if need to do something else with it (link votes, etc)
    new_user = UserDB.parse_obj(new_user)

    return BaseResponse(success=True, payload=new_user, msg=None)


@router.post("/" + TOKEN_URL,
             response_description="Register a new user",
             response_model=AuthToken)
def request_auth_token(request: RequestWithDB, form_data: OAuth2PasswordRequestForm = Depends()):
    # it NEEDS to be sent as username, password, even if it is email
    email = form_data.username
    password = form_data.password

    unauthorized_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # verify that user exists
    if (
            (user := request.app.database[AUTH_USER_COLLECTION].find_one(
                {"email": email}))
            is None
    ):
        raise unauthorized_exception

    # Verify that password is correct, if it exists
    user = UserDB.parse_obj(user)
    if not verify_hash_password(password, user.password):
        raise unauthorized_exception

    # Else, is correct, simply generate token

    tokendata = UserToken.parse_obj(user).dict()
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    token_dict = {"exp": datetime.utcnow() + access_token_expires,
                  "payload": tokendata}
    access_token = jwt.encode(
        token_dict, request.app.secret_key, algorithm=JWT_ALGORITHM)

    return {"access_token": access_token, "token_type": "bearer"}
