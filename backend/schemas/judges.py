# backend/schemas/judges.py
from pydantic import BaseModel, Field

class JudgeBase(BaseModel):
    fio: str = Field(..., description="Full Name")
    specialization: str
    experience: int
    contact_info: str
    position: str

class JudgeCreate(JudgeBase):
    pass

class JudgeUpdate(JudgeBase):
    pass

class Judge(JudgeBase):
    id: int

    class Config:
        orm_mode = True