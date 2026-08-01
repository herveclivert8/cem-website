from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CallRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int | None
    text: str
    text_en: str | None
    created_at: datetime
