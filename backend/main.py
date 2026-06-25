from fastapi import FastAPI
from dotenv import load_dotenv
from database import client

load_dotenv()

app = FastAPI()

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