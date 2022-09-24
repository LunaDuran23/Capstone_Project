from backend.common.common import (
    AUTH_USER_COLLECTION, FACULTY_COLLECTION,
    VOTING_LIST_COLLECTION, VOTING_ROUND_COLLECTION
)
from backend.data.model import Faculty, UserDB, VotingList, VotingRound
from pymongo.database import Database

# maps collection to unique field indexes
# Simply don't include any collections, and the default _id unique index will be used for queries

UNIQUE_INDEXES = {
    AUTH_USER_COLLECTION: (UserDB, "universityID"),
    FACULTY_COLLECTION: (Faculty, "faculty_id"),
    VOTING_LIST_COLLECTION: (VotingList, "voting_list_id"),
    VOTING_ROUND_COLLECTION: (VotingRound, "round_id")
}


def initialize_unique_indexes(db: Database):
    def unique_indexes_error(field): return ValueError(
        f"Trying to create unique index key '{field}'on non-existant pydantic field"
    )

    for collection in UNIQUE_INDEXES:
        model, field = UNIQUE_INDEXES[collection]

        if model.__fields__.get(field) is None:
            raise unique_indexes_error(field)
        # check which are raised
        # infodict = db[FACULTY_COLLECTION].index_information()
        db[collection].drop_indexes()  # just simply drop all indexes

        # Initialize unique identifiers
        db[collection].create_index(field, unique=True)
