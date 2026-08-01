from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.publication import PublicationFormat


class PublicationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    title_en: str | None
    description: str
    description_en: str | None
    file_url: str | None
    thumbnail_url: str | None
    format: PublicationFormat
    contributors_count: int
    updated_at: datetime
    created_at: datetime
