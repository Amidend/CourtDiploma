from typing import Optional

from pydantic import BaseModel, Field
from datetime import date

class DocumentBase(BaseModel):
    name: str = Field(..., description="Document Name")
    description: str
    type: str
    date: date
    judge_id: Optional[int] = Field(None, description="ID of associated Judge")
    company_id: Optional[int] = Field(None, description="ID of associated Company")
    file: Optional[str] = Field(None, description="File path or identifier")

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int

    class Config:
        orm_mode = True