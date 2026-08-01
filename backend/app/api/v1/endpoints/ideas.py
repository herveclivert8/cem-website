from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.idea import IdeaPost
from app.models.user import User
from app.schemas.idea import IdeaCreate, IdeaRead

router = APIRouter(prefix="/ideas", tags=["ideas"])


@router.get("", response_model=list[IdeaRead])
async def list_ideas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(IdeaPost).options(selectinload(IdeaPost.author)).order_by(IdeaPost.created_at.desc()).limit(20)
    )
    return result.scalars().all()


@router.post("", response_model=IdeaRead, status_code=status.HTTP_201_CREATED)
async def create_idea(
    payload: IdeaCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    idea = IdeaPost(content=payload.content, author_id=current_user.id)
    db.add(idea)
    await db.commit()
    await db.refresh(idea, attribute_names=["author"])
    return idea
