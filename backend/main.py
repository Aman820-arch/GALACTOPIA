from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import client
from routes.auth import router as auth_router
from routes.favorites import router as favorites_router
from routes.watchlists import router as watchlist_router
from routes.continue_watching import router as continue_router
from routes.history import router as history_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

app.include_router(
    favorites_router,
    prefix="/favorites",
    tags=["Favorites"]
)

app.include_router(
    watchlist_router,
    prefix="/watchlist",
    tags=["Watchlist"]
)

app.include_router(
    continue_router,
    prefix="/continue",
    tags=["Continue Watching"]
)

app.include_router(
    history_router,
    prefix="/history",
    tags=["History"]
)

@app.get("/")
def root():
    try:
        client.admin.command("ping")

        return {
            "message": "Galactopia Backend Online",
            "database": "Connected"
        }

    except Exception as e:
        return {
            "message": "Galactopia Backend Online",
            "database": f"Error: {str(e)}"
        }