from pydantic import BaseModel

class CarroBase(BaseModel):
    modelo: int
    marca: str
    serie: str

class CarroCreate(CarroBase):
    pass

class Carro(CarroBase):
    id: int

    class Config:
        from_attributes = True
