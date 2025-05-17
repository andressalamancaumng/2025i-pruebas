from pydantic import BaseModel, Field

class PeliculaBase(BaseModel):
    name_movie: str = Field(..., example="Inception")
    anio: int = Field(..., gt=1800, lt=2100, example=2010)
    director: str = Field(..., example="Christopher Nolan")

class PeliculaCreate(PeliculaBase):
    pass

class Pelicula(PeliculaBase):
    id: int

    class Config:
        orm_mode = True
