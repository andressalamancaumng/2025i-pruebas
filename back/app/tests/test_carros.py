import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_crear_carro():
    response = client.post("/carros/", json={"modelo": 2022, "marca": "Tesla", "serie": "TES123"})
    assert response.status_code == 200
    data = response.json()
    assert data["modelo"] == 2022
    assert data["marca"] == "Tesla"
    assert data["serie"] == "TES123"
    assert "id" in data

def test_leer_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "modelo" in data[0]
        assert "marca" in data[0]
        assert "serie" in data[0]

def test_leer_carro_por_id():
    # Crear un carro para obtener su id
    create_response = client.post("/carros/", json={"modelo": 2023, "marca": "Ford", "serie": "FOR456"})
    assert create_response.status_code == 200
    carro_id = create_response.json()["id"]

    response = client.get(f"/carros/{carro_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == carro_id
    assert data["marca"] == "Ford"

def test_eliminar_carro_por_id():
    # Crear un carro para obtener su id
    create_response = client.post("/carros/", json={"modelo": 2021, "marca": "Chevrolet", "serie": "CHE789"})
    assert create_response.status_code == 200
    carro_id = create_response.json()["id"]

    response = client.delete(f"/carros/{carro_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Carro eliminado"}

    # Verificar que el carro fue eliminado
    get_response = client.get(f"/carros/{carro_id}")
    assert get_response.status_code == 404

def test_eliminar_carro_por_detalles():
    # Crear un carro para obtener su id
    create_response = client.post("/carros/", json={"modelo": 2020, "marca": "Honda", "serie": "HON123"})
    assert create_response.status_code == 200
    carro_id = create_response.json()["id"]

    response = client.delete(f"/carros/?carro_id={carro_id}&modelo=2020&marca=Honda")
    assert response.status_code == 200
    assert response.json() == {"message": "Carro eliminado por detalles"}

    # Verificar que el carro fue eliminado
    get_response = client.get(f"/carros/{carro_id}")
    assert get_response.status_code == 404
