from sqlalchemy.orm import Session
from . import models

def seed_initial_data(db: Session):
    # Check if there are already cars in the database
    existing = db.query(models.Carro).first()
    if existing:
        return  # Data already seeded

    # Create example car data
    car1 = models.Carro(modelo=2020, marca="chevrolet", serie="sail")
    db.add(car1)
    db.commit()
