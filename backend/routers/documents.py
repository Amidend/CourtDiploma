from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.schemas.documents import DocumentCreate, DocumentUpdate, Document
from backend.models.models import Document as DocumentModel

router = APIRouter(prefix="/admin/documents")

# Get all documents
@router.get("/", response_model=List[Document])
async def get_documents(db: Session = Depends(get_db)):
    documents = db.query(DocumentModel).all()
    return documents

# Create a new document
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Document)
async def create_document(document: DocumentCreate, db: Session = Depends(get_db)):
    db_document = DocumentModel(**document.dict())
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

# Get a specific document
@router.get("/{document_id}", response_model=Document)
async def get_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(DocumentModel).get(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

# Update a document
@router.put("/{document_id}", response_model=Document)
async def update_document(document_id: int, updated_document: DocumentUpdate, db: Session = Depends(get_db)):
    document = db.query(DocumentModel).get(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    document_data = updated_document.dict(exclude_unset=True)
    for key, value in document_data.items():
        setattr(document, key, value)
    db.commit()
    db.refresh(document)
    return document

# Delete a document
@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(DocumentModel).get(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(document)
    db.commit()
    return  # No content returned for DELETE