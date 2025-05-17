from typing import Optional
from pydantic import BaseModel, Field

class PeliculaBase(BaseModel):
    nombre: str = Field(..., example="Inception")
    anio: int = Field(..., gt=1800, lt=2100, example=2010)
    director: str = Field(..., example="Christopher Nolan")

class PeliculaCreate(PeliculaBase):
    pass

class PeliculaUpdate(BaseModel):
    nombre: Optional[str] = None
    anio: Optional[int] = Field(None, gt=1800, lt=2100)
    director: Optional[str] = None

class Pelicula(PeliculaBase):
    id: int

    class Config:
        orm_mode = True