from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.publication import Publication
from app.schemas.publication import PublicationRead

router = APIRouter(prefix="/publications", tags=["publications"])


def _to_read(publication: Publication) -> PublicationRead:
    return PublicationRead(
        id=publication.id,
        title=publication.title,
        title_en=publication.title_en,
        description=publication.description,
        description_en=publication.description_en,
        file_url=publication.file_url,
        thumbnail_url=publication.thumbnail_url,
        format=publication.format,
        contributors_count=len(publication.contributors),
        updated_at=publication.updated_at,
        created_at=publication.created_at,
    )


@router.get("", response_model=list[PublicationRead])
async def list_publications(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Publication)
        .options(selectinload(Publication.contributors))
        .order_by(Publication.updated_at.desc())
    )
    publications = result.scalars().all()
    return [_to_read(p) for p in publications]


@router.get("/{publication_id}", response_model=PublicationRead)
async def get_publication(publication_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Publication)
        .options(selectinload(Publication.contributors))
        .where(Publication.id == publication_id)
    )
    publication = result.scalar_one_or_none()
    if publication is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Publication introuvable")
    return _to_read(publication)
