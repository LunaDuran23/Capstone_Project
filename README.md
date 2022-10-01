To get server up and running, install requirements (python 3.8, although any python 3.6+ should work)

(Please, do this in a venv)
```
@@ -14,6 +14,7 @@ MONGO_URI = localhost:27017
DB_NAME = my_db_name
DB_USER = my_db_user
DB_USER_PASS = my_db_password123
SECRET_KEY_HEX = ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff # 256 bit key for signing jwt tokens
```

Refer to for more info:
https://www.mongodb.com/features/mongodb-authentication
To start server
```
uvicorn backend.main:app --reload
```
Remember go to /docs for auto-generated swagger cool-nice looking docs. http://127.0.0.1:8000/docs#/
