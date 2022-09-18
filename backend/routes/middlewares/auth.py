from backend.common.common import JWT_ALGORITHM, TOKEN_URL, AUTH_PREFIX, API_PREFIX
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from backend.data.model.auth_token import UserToken
import jwt


from backend.common.types import RequestWithDB

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=API_PREFIX + AUTH_PREFIX + '/' + TOKEN_URL)


def authenticated_user(request: RequestWithDB, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    expired_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token is expired",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, request.app.secret_key,
                             algorithms=[JWT_ALGORITHM])
        tokendata = UserToken.parse_obj(payload["payload"])
        return tokendata
    except jwt.exceptions.DecodeError:
        raise credentials_exception
    except jwt.exceptions.ExpiredSignatureError:
        raise expired_exception
    except BaseException as e:
        raise credentials_exception
