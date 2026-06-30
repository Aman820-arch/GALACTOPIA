from pydantic import BaseModel


class WatchlistMovie(BaseModel):
    movie_id: int
    title: str
    poster: str | None = None
    year: str
    tag: str
    email: str