from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.session_service import session_manager

router = APIRouter()

class ConnectionManager: 
    def __init__(self): 
        self.rooms: dict[str, list[WebSocket]] = {}
        self.tick_tasks: dict[str, asyncio.Task] = {}

    async def connect(self, session_id: str, ws: WebSocket): 
        await ws.accept()
        self.rooms.setdefault(session_id, []).append(ws)
    
    def disconnect(self, session_id: str, ws: WebSocket): 
        if session_id in self.rooms and ws in self.rooms[session_id]:
            self.rooms[session_id].remove(ws)
    
    async def broadcast(self, session_id: str, message: dict): 
        for ws in self.rooms.get(session_id, []): 
            await ws.send_json(message)
    
    async def _tick_loop(self, session_id: str, start_timestamp: float):
        while True: 
            elapsed = (time.time() * 1000) - start_timestamp
            await self.broadcast(session_id, {"type": "tick", "elapsed_ms": elapsed})
            await asyncio.sleep(0.1)

    def start_ticking(self, session_id: str, start_timestamp: float): 
        self.stop_ticking(session_id)
        self.tick_tasks[session_id] = asyncio.create_task(
            self._tick_loop(session_id, start_timestamp)
        )
    
    def stop_ticking(self, session_id: str): 
        task = self.tick_tasks.pop(session_id, None)
        if task: 
            task.cancel()

manager = ConnectionManager()

@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str): 
    await manager.connect(session_id, websocket)
    try: 
        while True: 
            data = await websocket.receive_json()
            msg_type = data.get("type")

            if msg_type == "join": 
                player = session_manager.add_player(session_id, data["player_id"], data["name"])
                await manager.broadcast(session_id, {"type": "player_joined", "name": player.name})
            
            elif msg_type == "start": 
                ts = session_manager.start(session_id, data["player_id"])
                # a tela publica e o celular recebem o mesmo timestamp de referência 
                await manager.broadcast(session_id, {
                    "type": "started", "start_timestamp": ts, "name": data.get("name")
                })
            
            elif msg_type == "finish": 
                elapsed = session_manager.finish(session_id, data["player_id"])
                session = session_manager.get(session_id)
                ranking = [
                    {"position": i + 1, "name": p.name, "elapsed_ms": p.elapsed_ms}
                    for i, p in enumerate(session.ranking())
                ]
                await manager.broadcast(session_id, {
                    "type": "finished", "elapsed_ms": elapsed, "ranking": ranking
                })
    
    except WebSocketDisconnect:
        manager.disconnect(session_id, websocket)