
from sqlalchemy import Column, Integer, String,Date, LargeBinary, ForeignKey
from passlib.hash import bcrypt
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String) # 'admin' or 'user'

    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)
class Template(Base):
    __tablename__ = "templates"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    content = Column(LargeBinary, nullable=False)

class Judge(Base):
    __tablename__ = "judges"

    id = Column(Integer, primary_key=True)
    fio = Column(String(255), nullable=False)  # Full Name
    specialization = Column(String(255), nullable=False)
    experience = Column(Integer, nullable=False)
    contact_info = Column(String(255), nullable=False)
    position = Column(String(255), nullable=False)

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    legal_address = Column(String(255), nullable=False)
    inn = Column(String(255), nullable=False)  # Taxpayer Identification Number
    ogrn = Column(String(255), nullable=False)  # Main State Registration Number
    contact_info = Column(String(255), nullable=False)
    website = Column(String(255), nullable=False)

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    type = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)
    judge_id = Column(Integer, ForeignKey("judges.id"), nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)
    file = Column(LargeBinary, nullable=True)

    judge = relationship("Judge", backref="documents")
    company = relationship("Company", backref="documents")

    def __json__(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "type": self.type,
            "date": self.date,
            "judge_id": self.judge_id,
            "company_id": self.company_id,
            "file": self.file
        }
