from fastapi import APIRouter, Depends; from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db; from app.core.deps import get_current_user; from app.models.user import User
from app.schemas.campaign import CampaignCreate, CampaignResponse, TargetResponse; from app.services import campaign_service as s

router = APIRouter(prefix="/api/campaigns", tags=["campaigns"])

@router.post("", response_model=CampaignResponse)
async def create(data: CampaignCreate, u: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await s.create(db, u.id, data)

@router.get("", response_model=list[CampaignResponse])
async def list_campaigns(u: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await s.list_campaigns(db, u.id)

@router.post("/{cid}/targets", response_model=TargetResponse)
async def add_target(cid: str, email: str, name: str | None = None, department: str | None = None,
    u: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await s.add_target(db, u.id, cid, email, name, department)

@router.get("/{cid}/targets", response_model=list[TargetResponse])
async def list_targets(cid: str, u: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await s.list_targets(db, cid)

@router.get("/stats")
async def stats(u: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await s.get_stats(db, u.id)
