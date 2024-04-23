from sqlalchemy import create_engine, orm, QueuePool, inspect
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from config import DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME

Base = declarative_base()



DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    DATABASE_URL,
    echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)






Base.metadata.create_all(bind=engine)
def create_tables():
    inspector = inspect(engine)
    for table_name in Base.metadata.tables:
        if not inspector.has_table(table_name):
            Base.metadata.tables[table_name].create(bind=engine)
            print(f"Table '{table_name}' created successfully.")
        else:
            print(f"Table '{table_name}' already exists. Skipping creation.")
create_tables()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
