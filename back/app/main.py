from fastapi import FastAPI
from app import models
from app.database import engine

# Crear las tablas automáticamente en la base de datos
models.Base.metadata.create_all(bind=engine)

# Inicializar la aplicación FastAPI
app = FastAPI()

# Endpoint de prueba para verificar que todo funcione
@app.get("/")
def read_root():
    return {"mensaje": "API funcionando correctamente"}
