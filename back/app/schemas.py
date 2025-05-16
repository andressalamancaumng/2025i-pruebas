from pydantic import BaseModel

class PeliculaCreate(BaseModel):
    nombre: str
    anio: int
    director: str




