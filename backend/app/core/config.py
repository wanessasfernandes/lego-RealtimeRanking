from pydantic_settings import BaseSettings 

class Settings(BaseSettings): 
    app_name: str = "Lego Realtime Ranking"
    cors_origins: list[str] = [
        "http://localhost:5173",
        "https://lego-realtime-ranking.vercel.app"]

Settings = Settings()