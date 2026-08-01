from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.project import Project
from app.schemas.project import ProjectRead

router = APIRouter(prefix="/projects", tags=["projects"])


def _to_read(project: Project) -> ProjectRead:
    return ProjectRead(
        id=project.id,
        title=project.title,
        title_en=project.title_en,
        description=project.description,
        description_en=project.description_en,
        image_url=project.image_url,
        zone_geo=project.zone_geo,
        tags=list(project.tags),
        contributors_count=len(project.contributors),
        updated_at=project.updated_at,
        created_at=project.created_at,
    )


@router.get("", response_model=list[ProjectRead])
async def list_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.tags), selectinload(Project.contributors))
        .order_by(Project.updated_at.desc())
    )
    projects = result.scalars().all()
    return [_to_read(p) for p in projects]


@router.get("/{project_id}", response_model=ProjectRead)
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.tags), selectinload(Project.contributors))
        .where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Projet introuvable")
    return _to_read(project)
