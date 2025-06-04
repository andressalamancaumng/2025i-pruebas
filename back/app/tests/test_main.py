from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", params={"name": "Juan", "email": "juan@example.com"})
    assert response.status_code == 200
    assert response.json()["name"] == "Juan" 

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# **Pruebas para carros**

# 1. Prueba para crear un carro
def test_create_carro():
    response = client.post("/carros/", json={"modelo": 2025, "marca": "Toyota", "serie": "123ABC"})
    assert response.status_code == 200
    assert response.json()["modelo"] == 2025
    assert response.json()["marca"] == "Toyota"
    assert response.json()["serie"] == "123ABC"

# 2. Prueba para leer todos los carros
def test_read_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# 3. Prueba para obtener un carro por ID
def test_read_carro_by_id():
    # Primero, creamos un carro
    create_response = client.post("/carros/", json={"modelo": 2025, "marca": "Toyota", "serie": "123ABC"})
    carro_id = create_response.json()["id"]

    # Luego, obtenemos el carro por su ID
    response = client.get(f"/carros/{carro_id}")
    assert response.status_code == 200
    assert response.json()["id"] == carro_id
    assert response.json()["modelo"] == 2025
    assert response.json()["marca"] == "Toyota"
    assert response.json()["serie"] == "123ABC"

# 4. Prueba para eliminar un carro por ID
def test_delete_carro():
    # Primero, creamos un carro
    create_response = client.post("/carros/", json={"modelo": 2025, "marca": "Toyota", "serie": "123ABC"})
    carro_id = create_response.json()["id"]

    # Luego, eliminamos el carro por su ID
    response = client.delete(f"/carros/{carro_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Carro deleted successfully"}

    # Verificamos que el carro haya sido eliminado
    get_response = client.get(f"/carros/{carro_id}")
    assert get_response.status_code == 404