from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

from app.api.v1.endpoints.auth import _set_refresh_cookie
from app.core.config import settings
from app.core.security import create_token
from app.db.session import get_db
from app.models.user import OAuthProvider, User
from app.services.oauth_google import oauth

router = APIRouter(prefix="/auth/oauth", tags=["oauth"])


@router.get("/google/login")
async def google_login(request: Request):
    return await oauth.google.authorize_redirect(request, settings.GOOGLE_REDIRECT_URI)


@router.get("/google/callback")
async def google_callback(request: Request, db: AsyncSession = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    userinfo = token.get("userinfo") or {}

    email = userinfo.get("email")
    if not email:
        return RedirectResponse(f"{settings.FRONTEND_URL}/login?error=oauth_failed")

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if user is None:
        user = User(
            email=email,
            full_name=userinfo.get("name") or email.split("@")[0],
            avatar_url=userinfo.get("picture"),
            oauth_provider=OAuthProvider.GOOGLE,
            oauth_id=userinfo.get("sub"),
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    access_token = create_token(str(user.id), "access")
    redirect = RedirectResponse(f"{settings.FRONTEND_URL}/oauth/callback?access_token={access_token}")
    _set_refresh_cookie(redirect, user.id)
    return redirect
