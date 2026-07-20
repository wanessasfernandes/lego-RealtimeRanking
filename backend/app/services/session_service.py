import time 
from app.models.session import GameSession, Player

COUNTDOWN_MS = 3000
class SessionManager: 
    def __init__(self): 
        self._sessions: dict[str, GameSession] = {}
    
    def create_session(self) -> GameSession:
        session = GameSession()
        self._sessions[session.id] = session
        return session
    
    def get(self, session_id: str) -> GameSession | None: 
        return self._sessions.get(session_id)
    
    def add_player(self, session_id: str, player_id: str, name: str) -> Player: 
        session = self._sessions[session_id]
        player = Player(id=player_id, name=name)
        session.players[player_id] = player
        return player
    
    def start(self, session_id: str, player_id: str) -> float: 
        session = self._sessions[session_id]
        session.active_player_id = player_id
        session.start_timestamp = (time.time() * 1000) + COUNTDOWN_MS
        return session.start_timestamp
    
    def finish(self, session_id: str, player_id: str) -> float: 
        session = self._sessions[session_id]
        elapsed = (time.time() * 1000) - session.start_timestamp
        session.players[player_id].elapsed_ms = elapsed
        return elapsed

# instância unica 
session_manager = SessionManager()