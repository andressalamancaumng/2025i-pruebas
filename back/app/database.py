# Propósito: Configura la conexión con la base de datos usando SQLAlchemy.
# Ejemplo: Define engine, SessionLocal y Base para usar en otros archivos.
# Ventaja: Centraliza la configuración de la DB.

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:123456@localhost/testdb")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
