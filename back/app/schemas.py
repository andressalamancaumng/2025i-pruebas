from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class PeliculaBase(BaseModel):
    nombre: str = Field(..., example="Inception")
    anio: int = Field(..., gt=1800, lt=2100, example=2010)
    director: str = Field(..., example="Christopher Nolan")


class PeliculaCreate(PeliculaBase):
    pass

class Pelicula(PeliculaBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
