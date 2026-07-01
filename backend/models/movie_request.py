from pydantic import BaseModel

class MovieRequest(BaseModel):
    name: str
    email: str
    type: str
    movieTitle: str = ""
    quality: str = ""
    message: str = ""
    status: str = "Pending"