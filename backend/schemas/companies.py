from pydantic import BaseModel, Field

class CompanyBase(BaseModel):
    name: str = Field(..., description="Company Name")
    legal_address: str
    inn: str = Field(..., description="Taxpayer Identification Number")
    ogrn: str = Field(..., description="Main State Registration Number")
    contact_info: str
    website: str

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int

    class Config:
        orm_mode = True