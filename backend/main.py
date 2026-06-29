from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import client
from routes.auth import router as auth_router

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