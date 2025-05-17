from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    _tablename_ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), index=True)
    correo = Column(String(50), unique=True, index=True)
    documento = Column(String(50), unique=True, index=True)