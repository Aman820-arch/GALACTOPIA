from fastapi import APIRouter
from database import db
from models.favorite import FavoriteMovie

router = APIRouter()

favorites_collection = db["favorites"]


@router.post("/add")
def add_favorite(movie: FavoriteMovie):

    existing = favorites_collection.find_one({
        "email": movie.email,
        "movie_id": movie.movie_id
    })

    if existing:
        return {
            "success": False,
            "message": "Movie already in favorites"
        }

    favorites_collection.insert_one(movie.model_dump())

    return {
        "success": True,
        "message": "Movie added to favorites"
    }


@router.get("/{email}")
def get_favorites(email: str):

    favorites = list(
        favorites_collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return favorites


@router.delete("/remove/{email}/{movie_id}")
def remove_favorite(email: str, movie_id: int):

    result = favorites_collection.delete_one({
        "email": email,
        "movie_id": movie_id
    })

    if result.deleted_count == 0:
        return {
            "success": False,
            "message": "Movie not found"
        }

    return {
        "success": True,
        "message": "Movie removed"
    }