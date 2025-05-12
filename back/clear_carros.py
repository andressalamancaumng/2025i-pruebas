from app.database import SessionLocal
from sqlalchemy import text

def clear_carros():
    db = SessionLocal()
    try:
        db.execute(text("DELETE FROM carros"))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    clear_carros()
    print("Datos de carros eliminados correctamente.")
