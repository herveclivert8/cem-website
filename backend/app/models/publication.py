import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, Table, Text, Column, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class PublicationFormat(str, enum.Enum):
    PDF = "pdf"
    RAPPORT = "rapport"


publication_contributors = Table(
    "publication_contributors",
    Base.metadata,
    Column("publication_id", ForeignKey("publications.id", ondelete="CASCADE"), primary_key=True),
    Column("user_id", ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
)


class Publication(Base):
    __tablename__ = "publications"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    title_en: Mapped[str | None] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    description_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    file_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    thumbnail_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    format: Mapped[PublicationFormat] = mapped_column(
        Enum(PublicationFormat, name="publication_format", values_callable=lambda e: [m.value for m in e]),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    contributors: Mapped[list["User"]] = relationship(secondary=publication_contributors)
