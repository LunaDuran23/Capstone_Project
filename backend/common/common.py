'''
AUTH OPTIONS
'''

ACCESS_TOKEN_EXPIRE_MINUTES = 30
TOKEN_URL = "token"
JWT_ALGORITHM = "HS256"


'''
DATABASE NAMING
'''

AUTH_USER_COLLECTION = "users"
FACULTY_COLLECTION = "faculties"
CANDIDATE_COLLECTION = "candidates"
VOTING_LIST_COLLECTION = "voting_lists"
VOTING_ROUND_COLLECTION = "voting_rounds"
# this is effectively a nice spanglish, as it is called ballot box
VOTING_URNS_COLLECTION = "voting_urns"

'''
API PATHS
'''
# api prefix
API_PREFIX = "/api"

# API PREFIXES
AUTH_PREFIX = "/auth"
USER_PREFIX = "/users"
INFO_PREFIX = "/info"
VOTING_PREFIX = "/voting"
