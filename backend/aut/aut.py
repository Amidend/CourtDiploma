from passlib.handlers.bcrypt import bcrypt
from sqlalchemy.orm import Session

from backend.models.models import User
from backend.models.database import get_db

from fastapi import Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi import Cookie



import os

# Secret key for cookie signing (replace with your own secret)

SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable not set")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or user.password_hash != password:
        return False
    return user

def get_current_user(response: Response, db: Session = Depends(get_db), user_id: str = Cookie(None)):
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication")
    response.set_cookie(key="user_id", value=str(user.id), httponly=True)
    return user

def get_admin_user(current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return current_user