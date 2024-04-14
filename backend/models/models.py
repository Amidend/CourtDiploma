from sqlalchemy import Column, Integer, String, Date, ForeignKey, MetaData, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

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
    judge_id = Column(Integer, ForeignKey("judges.id"), nullable=False)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    file = Column(String(255), nullable=False)

    judge = relationship(Judge)
    company = relationship(Company)