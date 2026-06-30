from pydantic import BaseModel

class FavoriteMovie(BaseModel):
    movie_id: int
    title: str
    poster: str | None = None
    year: str | None = None
    tag: str | None = None
    email: str