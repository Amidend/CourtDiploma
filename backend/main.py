from datetime import datetime
from fastapi import FastAPI, File, UploadFile, Form, Depends, APIRouter
from typing import List
from docx import Document
from io import BytesIO

from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from models.database import get_db, create_tables  # Import database session
from models.models import Template, Document, Judge, Company  # Import SQLAlchemy models

app = FastAPI()

router = APIRouter()


origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:8080",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

@app.post("/admin/upload_template")
async def upload_template(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()  # Read the binary content
    template = Template(name=file.filename, content=content)
    db.add(template)
    db.commit()
    db.refresh(template)
    return {"message": f"Template '{file.filename}' uploaded successfully with ID: {template.id}"}


# User endpoint to generate document
@app.post("/user/generate_document")
async def generate_document(template_id: int = Form(...), data: List[str] = Form(...), db: Session = Depends(get_db)):
    template = db.query(Template).get(template_id)
    if not template:
        return {"error": "Template not found."}

    with BytesIO(template.content) as template_file:
        doc = Document(template_file)

    for i, value in enumerate(data):
        for paragraph in doc.paragraphs:
            paragraph.text = paragraph.text.replace(f"{{{{{i}}}}}", value)

    # Save the generated document to the database
    temp_file = BytesIO()
    doc.save(temp_file)
    generated_doc = Document(
        name=f"generated_{template.name}",
        description="Generated document",
        type="docx",
        date=datetime.date.today(),
        # ... other document fields ...
        file=temp_file.getvalue()  # Store the document content as bytes
    )
    db.add(generated_doc)
    db.commit()
    db.refresh(generated_doc)

    print("Response data:", generated_doc)  # Print before returning
    return {"message": f"Document generated successfully with ID: {generated_doc.id}"}

@router.get("/options")
async def get_selection_options(db: Session = Depends(get_db)):
    templates = db.query(Template.id, Template.name).all()
    judges = db.query(Judge.id, Judge.fio).all()
    companies = db.query(Company.id, Company.name).all()

    print("Templates:", templates)  # Add print statement for debugging
    print("Judges:", judges)
    print("Companies:", companies)

    return {
        "templates": [{"id": t[0], "name": t[1]} for t in templates],
        "judges": [{"id": j[0], "fio": j[1]} for j in judges],
        "companies": [{"id": c[0], "name": c[1]} for c in companies],
    }

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)


