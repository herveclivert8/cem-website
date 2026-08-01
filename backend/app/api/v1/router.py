from fastapi import APIRouter

from app.api.v1.endpoints import auth, calls, ideas, oauth, projects, publications, search

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(oauth.router)
api_router.include_router(projects.router)
api_router.include_router(publications.router)
api_router.include_router(calls.router)
api_router.include_router(ideas.router)
api_router.include_router(search.router)
