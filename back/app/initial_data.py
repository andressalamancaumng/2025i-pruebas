from sqlalchemy.orm import Session
from . import models

from sqlalchemy.orm import Session
from .models import Carro

def seed_initial_data(db: Session):
    # Esta función no realiza ninguna acción para limpiar la tabla Carro
    pass

    # Create example car data
    car1 = models.Carro(modelo=2020, marca="chevrolet", serie="sail")
    db.add(car1)
    db.commit()