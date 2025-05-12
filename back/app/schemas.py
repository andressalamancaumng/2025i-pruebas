from pydantic import BaseModel

class CarroCreate(BaseModel):
    modelo: str
    marca: str
    serie: str
