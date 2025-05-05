from sqlalchemy import create_engine  # Importa el motor de base de datos
from sqlalchemy.orm import sessionmaker, declarative_base  # Importa herramientas para sesiones y modelos
import os  # Importa el módulo para manejar variables de entorno

# Obtiene la URL de la base de datos desde las variables de entorno o usa un valor por defecto
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:123456@localhost/testdb")

# Crea el motor de conexión a la base de datos
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Configura la sesión de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crea la base declarativa para definir los modelos
Base = declarative_base()

def init_db():
    # Inicializa la base de datos: elimina y crea todas las tablas
    from app import models  # Importa los modelos
    Base.metadata.drop_all(bind=engine)  # Elimina todas las tablas existentes
    Base.metadata.create_all(bind=engine)  # Crea todas las tablas definidas en los modelos