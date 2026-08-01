from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TagRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class ProjectRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    title_en: str | None
    description: str
    description_en: str | None
    image_url: str | None
    zone_geo: str | None
    tags: list[TagRead]
    contributors_count: int
    updated_at: datetime
    created_at: datetime
