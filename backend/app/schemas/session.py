from pydantic import BaseModel

class CreateSessionResponse(BaseModel): 
    session_id: str
    join_url: str

class RankingEntry(BaseModel):
    position: int 
    name: str
    elapsed_ms: float

class RankingResponse(BaseModel):
    ranking: list[RankingEntry]

# mensagens trocadas via WebSocket 
class WSMessage(BaseModel):
    type: str               # "join" | "start" | "finish" | "state"
    name: str | None = None
    elapsed_ms: float | None = None
