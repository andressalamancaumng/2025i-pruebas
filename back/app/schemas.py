from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class PeliculaBase(BaseModel):
    name_movie: str = Field(..., json_schema_extra={"example": "Inception"})
    anio: int = Field(..., gt=1800, lt=2100, json_schema_extra={"example": 2010})
    director: str = Field(..., json_schema_extra={"example": "Christopher Nolan"})

class PeliculaCreate(PeliculaBase):
    pass

class Pelicula(PeliculaBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
