from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.schemas.templates import TemplateCreate, TemplateUpdate, Template
from backend.models.models import Template as TemplateModel

router = APIRouter(prefix="/admin/templates")

# Get all templates (metadata only)
@router.get("/", response_model=List[Template])
async def get_templates(db: Session = Depends(get_db)):
    templates = db.query(TemplateModel).all()
    return templates

# Create a new template
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Template)
async def create_template(file: UploadFile = File(...), name: str = Form(...), db: Session = Depends(get_db)):
    content = await file.read()
    db_template = TemplateModel(name=name, content=content)
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template

# Get a specific template (with content)
@router.get("/{template_id}", response_model=Template)
async def get_template(template_id: int, db: Session = Depends(get_db)):
    template = db.query(TemplateModel).get(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

# Update a template (name only)
@router.put("/{template_id}", response_model=Template)
async def update_template(template_id: int, updated_template: TemplateUpdate, db: Session = Depends(get_db)):
    template = db.query(TemplateModel).get(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    template_data = updated_template.dict(exclude_unset=True)
    for key, value in template_data.items():
        setattr(template, key, value)
    db.commit()
    db.refresh(template)
    return template

# Delete a template
@router.delete("/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_template(template_id: int, db: Session = Depends(get_db)):
    template = db.query(TemplateModel).get(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    db.delete(template)
    db.commit()
    return  # No content returned for DELETE