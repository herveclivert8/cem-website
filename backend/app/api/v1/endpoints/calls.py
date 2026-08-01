from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.call import CallForParticipation
from app.schemas.call import CallRead

router = APIRouter(prefix="/calls-for-participation", tags=["calls"])


@router.get("", response_model=list[CallRead])
async def list_calls(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CallForParticipation).order_by(CallForParticipation.created_at.desc()))
    return result.scalars().all()
