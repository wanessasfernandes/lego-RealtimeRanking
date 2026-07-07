from dataclasses import dataclass, field
from datetime import datetime
import uuid

@dataclass 
class Player: 
    id: str
    name: str 
    elapsed_ms: float | None = None
    finished_at: datetime | None = None

@dataclass
class GameSession: 
    id: str = field(default_factory=lambda: uuid.uuid4().hex[:8])
    players: dict[str, Player] = field(default_factory=dict)
    active_player_id: str | None = None
    start_timestamp: float | None = None

    def ranking(self) -> list[Player]: 
        finished = [p for p in self.players.values() if p.elapsed_ms is not None]
        return sorted(finished, key=lambda p: p.elapsed_ms)