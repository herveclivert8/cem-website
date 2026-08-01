from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.user import UserRole


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str
    avatar_url: str | None
    role: UserRole
    created_at: datetime


class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
