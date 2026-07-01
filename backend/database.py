from pymongo import MongoClient
from dotenv import load_dotenv
import certifi
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(
    MONGODB_URI,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client["galactopia"]

users_collection = db["users"]