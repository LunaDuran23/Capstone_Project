from passlib.hash import bcrypt


def bcrypt_hash_password(plaintext: str) -> str:
    return bcrypt.hash(plaintext)


def verify_hash_password(plaintext: str, hash: str) -> bool:
    return bcrypt.verify(plaintext, hash)
