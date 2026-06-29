from fastapi import APIRouter
from models.user import UserCreate, UserLogin
from database import users_collection
import bcrypt

router = APIRouter()

@router.post("/register")
def register(user: UserCreate):

    existing = users_collection.find_one({
        "$or": [
            {"email": user.email},
            {"username": user.username}
        ]
    })

    if existing:
        return {
            "success": False,
            "message": "User already exists"
        }

    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    })

    return {
        "success": True,
        "message": "Account created successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        return {
            "success": False,
            "message": "User not found"
        }

    password_match = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user["password"].encode("utf-8")
    )

    if not password_match:
        return {
            "success": False,
            "message": "Invalid password"
        }

    return {
        "success": True,
        "message": "Login successful",
        "user": {
            "username": existing_user["username"],
            "email": existing_user["email"]
        }
    }