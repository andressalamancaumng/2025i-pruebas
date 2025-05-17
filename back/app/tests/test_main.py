from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Variable para guardar el ID del carro creado
carro_id = None

def test_crear_carro():
    global carro_id
    response = client.post("/carros/", json={
        "modelo": "Accord",
        "marca": "Honda",
        "serie": "HND-2024"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["modelo"] == "Accord"
    assert data["marca"] == "Honda"
    assert data["serie"] == "HND-2024"
    carro_id = data["id"]  # guardamos el ID para usarlo en las siguientes pruebas

def test_obtener_todos_los_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_obtener_carro_por_id():
    response = client.get(f"/carros/{carro_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == carro_id
    assert data["modelo"] == "Accord"

def test_eliminar_carro_existente():
    response = client.delete(f"/carros/{carro_id}")
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Carro eliminado exitosamente"

def test_eliminar_carro_inexistente():
    response = client.delete("/carros/999999")  # ID muy alto para simular inexistente
    assert response.status_code == 404
    assert response.json()["detail"] == "Carro no encontrado"



