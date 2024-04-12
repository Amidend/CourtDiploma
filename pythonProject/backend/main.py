# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from bcrypt import hashpw, gensalt
from wtforms import StringField, PasswordField, SubmitField
from jinja2 import Environment, select_autoescape
#engine = create_engine("postgresql://postgres:password@localhost:5432/mydb")
#12345678
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

@app.get("/users")
async def users():
    return [{"name": "John Doe"}, {"name": "Jane Doe"}]

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(app, port=8000)

