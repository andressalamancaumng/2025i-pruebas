from sqlalchemy.orm import Session
from app.models import Car

def create_car(db:Session, modelo: int , marca: str, serie: str):
    car=Car(modelo=modelo,marca=marca,serie=serie)
    db.add(car)
    db.commit()
    db.refresh(car)
    return car

def get_cars(db: Session):
    return db.query(Car).all()

def get_car_ID(db: Session, car_id: int):
    return db.query(Car).filter(Car.id==car_id).first()

def delete_car(db: Session, car_id: int, modelo: str, marca: str):
    car=db.query(Car).filter(
        Car.id==car_id,
        Car.modelo==modelo,
        Car.marca==marca
    ).first()

    if car:
        db.delete(car)
        db.commit()
        return True
    return False