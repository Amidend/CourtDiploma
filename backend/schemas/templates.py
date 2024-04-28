from pydantic import BaseModel, Field
from typing import Optional

class TemplateBase(BaseModel):
    name: str = Field(..., description="Template Name")
    content: Optional[bytes] = Field(None, description="Template Content (Binary)")

class TemplateCreate(TemplateBase):
    content: bytes = Field(..., description="Template Content (Binary)")

class TemplateUpdate(TemplateBase):
    pass

class Template(TemplateBase):
    id: int

    class Config:
        orm_mode = True