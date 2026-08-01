from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.user import UserRead


class IdeaCreate(BaseModel):
    content: str


class IdeaRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    content: str
    created_at: datetime
    author: UserRead
