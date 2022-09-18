from pydantic import BaseModel, Field


class AuthToken(BaseModel):
    access_token: str
    token_type: str


# Signed information about user and token!
#  It is encoded, and signed, but not encrypted, should NOT include confidential information
# But it should contain identifiable information, these are stored in user cookies and NOT accesible via any client-side javascript


class UserToken(BaseModel):
    name: str = Field(...)
    surname: str = Field(...)
    email: str = Field(...)
