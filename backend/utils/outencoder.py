from fastapi.encoders import jsonable_encoder


def out_encoder(x): return jsonable_encoder(
    x, exclude={"id", "_id", "password", "voting_lists", "candidates"})
