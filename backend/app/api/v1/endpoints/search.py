from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.project import Project, project_tags
from app.models.publication import Publication
from app.models.tag import Tag
from app.schemas.search import SearchResults

router = APIRouter(prefix="/search", tags=["search"])


@router.get("", response_model=SearchResults)
async def search(q: str = Query(min_length=1), db: AsyncSession = Depends(get_db)):
    like = f"%{q}%"

    projects_result = await db.execute(
        select(Project)
        .options(selectinload(Project.tags), selectinload(Project.contributors))
        .outerjoin(project_tags, Project.id == project_tags.c.project_id)
        .outerjoin(Tag, Tag.id == project_tags.c.tag_id)
        .where(
            or_(
                Project.title.ilike(like),
                Project.description.ilike(like),
                Project.zone_geo.ilike(like),
                Tag.name.ilike(like),
            )
        )
        .distinct()
        .order_by(Project.updated_at.desc())
    )
    projects = projects_result.scalars().all()

    publications_result = await db.execute(
        select(Publication)
        .options(selectinload(Publication.contributors))
        .where(or_(Publication.title.ilike(like), Publication.description.ilike(like)))
        .order_by(Publication.updated_at.desc())
    )
    publications = publications_result.scalars().all()

    from app.api.v1.endpoints.projects import _to_read as project_to_read
    from app.api.v1.endpoints.publications import _to_read as publication_to_read

    return SearchResults(
        projects=[project_to_read(p) for p in projects],
        publications=[publication_to_read(p) for p in publications],
    )
