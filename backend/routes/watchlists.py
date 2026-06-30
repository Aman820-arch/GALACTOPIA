from fastapi import APIRouter
from database import db
from models.watchlist import WatchlistMovie

router = APIRouter()

watchlist_collection = db["watchlist"]


@router.post("/add")
def add_watchlist(movie: WatchlistMovie):

    existing = watchlist_collection.find_one({
        "email": movie.email,
        "movie_id": movie.movie_id
    })

    if existing:
        return {
            "success": False,
            "message": "Movie already in watchlist"
        }

    watchlist_collection.insert_one(movie.model_dump())

    return {
        "success": True,
        "message": "Movie added to watchlist"
    }


@router.get("/{email}")
def get_watchlist(email: str):

    watchlist = list(
        watchlist_collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return watchlist


@router.delete("/remove/{email}/{movie_id}")
def remove_watchlist(email: str, movie_id: int):

    result = watchlist_collection.delete_one({
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
        "message": "Movie removed from watchlist"
    }