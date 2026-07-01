from pydantic import BaseModel

class HistoryMovie(BaseModel):
    movie_id: int
    title: str
    watchedAt: str
    email: str