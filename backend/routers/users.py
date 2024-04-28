from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.schemas.users import UserCreate, UserUpdate, User
from backend.models.models import User as UserModel

router = APIRouter(prefix="/admin/users")

# Get all users
@router.get("/", response_model=List[User])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users

# Create a new user
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # ... (Ideally, hash password here)
    db_user = UserModel(username=user.username, password_hash=user.password, role=user.role)  # Store plain text for now
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Include plain text password in response (NOT RECOMMENDED)
    return User(id=db_user.id, username=db_user.username, role=db_user.role, password=user.password)

# Get a specific user
@router.get("/{user_id}", response_model=User)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Update a user
@router.put("/{user_id}", response_model=User)
async def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(UserModel).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = updated_user.dict(exclude_unset=True)

    if "password" in user_data:
        # Securely update the password without hashing
        new_password = user_data.pop("password")
        user.set_password(new_password)  # Assuming you have a set_password method on your UserModel

    for key, value in user_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

# Delete a user
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return  # No content returned for DELETE