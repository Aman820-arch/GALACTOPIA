from pydantic import BaseModel


class ContinueMovie(BaseModel):
    movie_id: int
    title: str
    poster: str | None = None
    progress: int
    year: str
    tag: str
    email: str