import io, qrcode 
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.core.config import settings
from app.services.session_service import session_manager 
from app.schemas.session import CreateSessionResponse

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

@router.post("", response_model=CreateSessionResponse)
def create_session(): 
    session = session_manager.create_session()
    join_url = f"{settings.frontend_url}/jogar/{session.id}"
    return CreateSessionResponse(session_id=session.id, join_url=join_url)

@router.get("/{session_id}/qrcode")
def get_qrcode(session_id: str): 
    join_url = f"{settings.frontend_url}/jogar/{session_id}"
    img = qrcode.make(join_url)
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="image/png")