from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Car(Base):
    __tablename__="cars"

    id=Column(Integer, primary_key=True, index=True)
    modelo= Column(String(10), index=True)
    marca= Column(String(55), index=True)
    serie= Column(String(55), index=True)