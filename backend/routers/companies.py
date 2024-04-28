from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.schemas.companies import CompanyCreate, CompanyUpdate, Company
from backend.models.models import Company as CompanyModel

router = APIRouter(prefix="/admin/companies")

# Get all companies
@router.get("/", response_model=List[Company])
async def get_companies(db: Session = Depends(get_db)):
    companies = db.query(CompanyModel).all()
    return companies

# Create a new company
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Company)
async def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    db_company = CompanyModel(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

# Get a specific company
@router.get("/{company_id}", response_model=Company)
async def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).get(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

# Update a company
@router.put("/{company_id}", response_model=Company)
async def update_company(company_id: int, updated_company: CompanyUpdate, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).get(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    company_data = updated_company.dict(exclude_unset=True)
    for key, value in company_data.items():
        setattr(company, key, value)
    db.commit()
    db.refresh(company)
    return company

# Delete a company
@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).get(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    db.delete(company)
    db.commit()
    return  # No content returned for DELETE