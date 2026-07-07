from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import Settings
from app.api.session import router as session_router 
from app.websocket.main import router as webscoket_router 

app = FastAPI(title=Settings.app_name)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=Settings.cors_origins, 
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(session_router)
app.include_router(webscoket_router)