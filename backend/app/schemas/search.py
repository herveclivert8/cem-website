from pydantic import BaseModel

from app.schemas.project import ProjectRead
from app.schemas.publication import PublicationRead


class SearchResults(BaseModel):
    projects: list[ProjectRead]
    publications: list[PublicationRead]
