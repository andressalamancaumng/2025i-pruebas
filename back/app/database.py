from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import os


SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:123456@localhost/testdb")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

base = declarative_base()
def init_db():
    from app import models  # Importa los modelos
    base.metadata.drop_all(bind=engine)  # Borra tablas de las bases de datos
    base.metadata.create_all(bind=engine)  # Crea las tablas de acuerdo a los modelos


