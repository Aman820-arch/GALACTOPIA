from fastapi import APIRouter
from models.user import UserCreate
from database import users_collection

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate):

    existing = await users_collection.find_one({
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

    await users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": user.password
    })

    return {
        "success": True,
        "message": "Account created successfully"
    }