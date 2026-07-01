from fastapi import APIRouter, WebSocket, WebSocketDisconnect; from datetime import datetime, timezone
from sqlalchemy import select; from app.core.database import async_session; from app.models.campaign import Campaign, Target
router = APIRouter()

class Mgr:
    def __init__(self): self.active: dict[str, list[WebSocket]] = {}
    async def connect(self, uid: str, ws: WebSocket): await ws.accept(); self.active.setdefault(uid, []).append(ws)
    def disconnect(self, uid: str, ws: WebSocket): self.active.setdefault(uid, []).remove(ws); (not self.active[uid]) and self.active.pop(uid, None)
    async def broadcast(self, uid: str, msg: dict):
        for ws in self.active.get(uid, []):
            try: await ws.send_json(msg)
            except: pass
manager = Mgr()

@router.websocket("/ws/{user_id}")
async def ws_endpoint(ws: WebSocket, user_id: str):
    await manager.connect(user_id, ws)
    try:
        while True:
            data = await ws.receive_json()
            if data.get("action") == "simulate_click":
                cid = data.get("campaign_id"); email = data.get("target_email")
                async with async_session() as db:
                    r = await db.execute(select(Target).where(Target.campaign_id == cid, Target.email == email))
                    t = r.scalar_one_or_none()
                    if t:
                        t.clicked = True; t.phished = True; t.clicked_at = datetime.now(timezone.utc)
                        await db.commit()
                        await manager.broadcast(user_id, {"type": "phish", "campaign_id": cid, "target_email": email,
                            "clicked": True, "timestamp": datetime.now(timezone.utc).isoformat()})
    except WebSocketDisconnect: manager.disconnect(user_id, ws)
