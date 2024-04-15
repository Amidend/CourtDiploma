# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.



from fastapi import FastAPI, Depends, HTTPException, UploadFile
from fastapi.params import File, Form
from typing import List
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from typing import List
from docx import Document
from io import BytesIO
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from bcrypt import hashpw, gensalt
from wtforms import StringField, PasswordField, SubmitField
from jinja2 import Environment, select_autoescape

app = FastAPI()
templates = {}

# Admin endpoint to upload document templates
@app.post("/admin/upload_template")  # Corrected line
async def upload_template(file: UploadFile = File(...)):
    content = await file.read()
    templates[file.filename] = content
    return {"message": f"Template '{file.filename}' uploaded successfully."}

# User endpoint to generate document
@app.post("/user/generate_document")
async def generate_document(template_name: str = Form(...), data: List[str] = Form(...)):
    if template_name not in templates:
        return {"error": "Template not found."}

    template_bytes = templates[template_name]

    # Open the template from bytes using BytesIO
    with BytesIO(template_bytes) as template_file:
        doc = Document(template_file)

    # Replace placeholders in the template with data
    # (This is a basic example, customize based on your template structure)
    for i, value in enumerate(data):
        for paragraph in doc.paragraphs:
            paragraph.text = paragraph.text.replace(f"{{{{{i}}}}}", value)

    # Save the generated document temporarily
    temp_file = "generated_doc.docx"
    doc.save(temp_file)

    return FileResponse(temp_file, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename=f"generated_{template_name}")
@app.get("/")
async def root():
    return {"message": "Hello, world!"}

@app.get("/users")
async def users():
    return [{"name": "John Doe"}, {"name": "Jane Doe"}]

if __name__ == "__main__":




    import uvicorn
    uvicorn.run(app, port=8000)

