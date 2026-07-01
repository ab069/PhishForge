from sqlalchemy import select, func; from sqlalchemy.ext.asyncio import AsyncSession
from app.models.campaign import Campaign, Target; from app.schemas.campaign import CampaignCreate, CampaignResponse, TargetResponse

async def create(db: AsyncSession, uid: str, data: CampaignCreate) -> CampaignResponse:
    c = Campaign(user_id=uid, name=data.name, template=data.template, subject=data.subject,
        sender_name=data.sender_name, sender_email=data.sender_email, landing_page=data.landing_page)
    db.add(c); await db.commit(); await db.refresh(c); return CampaignResponse.model_validate(c)

async def list_campaigns(db: AsyncSession, uid: str) -> list[CampaignResponse]:
    r = await db.execute(select(Campaign).where(Campaign.user_id == uid).order_by(Campaign.created_at.desc()))
    return [CampaignResponse.model_validate(c) for c in r.scalars().all()]

async def add_target(db: AsyncSession, uid: str, cid: str, email: str, name: str | None = None, dept: str | None = None) -> TargetResponse:
    t = Target(user_id=uid, campaign_id=cid, email=email, name=name, department=dept)
    db.add(t); await db.commit(); await db.refresh(t); return TargetResponse.model_validate(t)

async def list_targets(db: AsyncSession, cid: str) -> list[TargetResponse]:
    r = await db.execute(select(Target).where(Target.campaign_id == cid).order_by(Target.created_at.desc()))
    return [TargetResponse.model_validate(t) for t in r.scalars().all()]

async def get_stats(db: AsyncSession, uid: str) -> dict:
    rc = await db.execute(select(func.count(Campaign.id)).where(Campaign.user_id == uid))
    rt = await db.execute(select(func.count(Target.id)).where(Target.user_id == uid))
    rp = await db.execute(select(func.count(Target.id)).where(Target.user_id == uid, Target.phished == True))
    return {"campaigns": rc.scalar() or 0, "targets": rt.scalar() or 0, "phished": rp.scalar() or 0}
