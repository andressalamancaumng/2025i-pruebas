import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_crear_pelicula():
    response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "anio": "2010"})
    assert response.status_code == 200
    data = response.json()
    assert data["nombrepelicula"] == "jackiechan8"
    assert data["director"] == "CHinCHan"
    assert data["anio"] == "2010"
    assert "id" in data

def test_listar_peliculas():
    response = client.get("/peliculas/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_eliminar_pelicula_por_id():
    # Crear un carro para obtener su id
    create_response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "anio": "2010"})
    assert create_response.status_code == 200
    pelicula_id = create_response.json()["id"]

    # Eliminar el carro creado
    response = client.delete(f"/peliculas/{pelicula_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Pelicula eliminada"}

    # Verificar que el carro ya no existe
    get_response = client.get(f"/peliculas/{pelicula_id}")
    assert get_response.status_code == 404
