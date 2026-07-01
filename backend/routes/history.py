from fastapi import APIRouter
from database import db
from models.history_movie import HistoryMovie

router = APIRouter()

collection = db["history"]


@router.post("/save")
def save_history(movie: HistoryMovie):
    collection.update_one(
        {
            "email": movie.email,
            "movie_id": movie.movie_id
        },
        {
            "$set": movie.model_dump()
        },
        upsert=True
    )

    return {"success": True}


@router.get("/{email}")
def get_history(email: str):
    movies = list(
        collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return movies