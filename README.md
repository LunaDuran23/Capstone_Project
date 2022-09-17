To get server up and running, install requirement (python 3.8)

(Please, do this in a venv)
```
pip install -r requirements.txt
```

Make sure to have a mongodb database running, ideally with access-control enabled.

Setup `.env` file with mongodb database info:

```
MONGO_URI = localhost:27017
DB_NAME = my_db_name
DB_USER = my_db_user
DB_USER_PASS = my_db_password123
```

Refer to for more info:
https://www.mongodb.com/features/mongodb-authentication

To start server

```
uvicorn backend.main:app --reload
```

Remember go to /docs for auto-generated swagger cool-nice looking docs. http://127.0.0.1:8000/docs#/

