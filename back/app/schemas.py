# Propósito: Define los esquemas que se usan para validar la entrada y salida de datos (con Pydantic).
# Ejemplo: CarroCreate, Carro definen los datos que se reciben/envían en las rutas.
# Ventaja: Protege tu API de datos inválidos y genera documentación automática en Swagger.

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
        orm_mode = True
