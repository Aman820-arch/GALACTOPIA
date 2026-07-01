from fastapi import APIRouter
from database import db
from models.movie_request import MovieRequest

router = APIRouter()

requests_collection = db["movie_requests"]


@router.post("/add")
def add_request(request: MovieRequest):

    requests_collection.insert_one(request.model_dump())

    return {
        "success": True,
        "message": "Request submitted successfully"
    }


@router.get("/")
def get_requests():

    requests = list(
        requests_collection.find(
            {},
            {"_id": 0}
        )
    )

    return requests


@router.patch("/status")
def update_status(email: str, movieTitle: str, status: str):

    result = requests_collection.update_one(
        {
            "email": email,
            "movieTitle": movieTitle
        },
        {
            "$set": {
                "status": status
            }
        }
    )

    if result.modified_count == 0:
        return {
            "success": False,
            "message": "Request not found"
        }

    return {
        "success": True,
        "message": "Status updated"
    }


@router.delete("/delete")
def delete_request(email: str, movieTitle: str):

    result = requests_collection.delete_one(
        {
            "email": email,
            "movieTitle": movieTitle
        }
    )

    if result.deleted_count == 0:
        return {
            "success": False,
            "message": "Request not found"
        }

    return {
        "success": True,
        "message": "Request deleted"
    }