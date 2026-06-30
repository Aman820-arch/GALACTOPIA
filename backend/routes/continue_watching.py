from fastapi import APIRouter
from database import db
from models.continue_movie import ContinueMovie

router = APIRouter()

collection = db["continue_watching"]


@router.post("/save")
def save_movie(movie: ContinueMovie):

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

    return {
        "success": True
    }


@router.get("/{email}")
def get_continue(email: str):

    movies = list(
        collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return movies