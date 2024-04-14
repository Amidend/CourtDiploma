from sqlalchemy import create_engine, orm
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configure database connection details here
DATABASE_URL = "postgresql://user:password@host:port/database"

engine = create_engine(DATABASE_URL, echo=True)  # Set echo=False for production
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
