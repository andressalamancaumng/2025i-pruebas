import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_crear_carro():
    response = client.post("/carros/", json={"modelo": 2023, "marca": "TestMarca", "serie": "TestSerie"})
    assert response.status_code == 200
    data = response.json()
    assert data["modelo"] == 2023
    assert data["marca"] == "TestMarca"
    assert data["serie"] == "TestSerie"
    assert "id" in data

def test_listar_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_eliminar_carro_por_id():
    # Crear un carro para obtener su id
    create_response = client.post("/carros/", json={"modelo": 2021, "marca": "Chevrolet", "serie": "Chrysler"})
    assert create_response.status_code == 200
    carro_id = create_response.json()["id"]

    # Eliminar el carro creado
    response = client.delete(f"/carros/{carro_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Carro eliminado"}

    # Verificar que el carro ya no existe
    get_response = client.get(f"/carros/{carro_id}")
    assert get_response.status_code == 404
