import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class UserRole(str, enum.Enum):
    MEMBER = "member"
    CONTRIBUTOR = "contributor"
    ADMIN = "admin"


class OAuthProvider(str, enum.Enum):
    GOOGLE = "google"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str | None] = mapped_column(String(255), nullable=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role", values_callable=lambda e: [m.value for m in e]),
        default=UserRole.MEMBER,
        nullable=False,
    )

    oauth_provider: Mapped[OAuthProvider | None] = mapped_column(
        Enum(OAuthProvider, name="oauth_provider", values_callable=lambda e: [m.value for m in e]), nullable=True
    )
    oauth_id: Mapped[str | None] = mapped_column(String(255), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    ideas: Mapped[list["IdeaPost"]] = relationship(back_populates="author")
