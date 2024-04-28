from typing import Optional

from pydantic import BaseModel, Field

class UserBase(BaseModel):
    username: str = Field(..., description="Username")
    password: str = Field(..., description="Password")
    role: str = Field(..., description="User Role ('admin' or 'user')")

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    password: str = Field(None, description="Password (leave empty to keep current password)")

# backend/schemas/users.py

class User(BaseModel):
    id: int
    username: str
    # ... other fields
    password: Optional[str] = None

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    id: int
    username: str
    role: str