from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Variables reutilizables
test_user_data = {
    "name": "Carlos",
    "email": "carlos@example.com",
    "documento": "9876543210"
}

def test_create_user():
    response = client.post("/users/", params=test_user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == test_user_data["name"]
    assert data["email"] == test_user_data["email"]
    assert data["documento"] == test_user_data["documento"]
    # Guardamos ID para usar en siguientes pruebas
    global created_user_id
    created_user_id = data["id"]

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert any(user["email"] == test_user_data["email"] for user in response.json())

def test_get_user_by_id():
    # Asegúrate que test_create_user se ejecuta antes
    response = client.get(f"/users/{created_user_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created_user_id
    assert data["email"] == test_user_data["email"]

def test_delete_user():
    # Eliminamos el usuario que se creó antes
    response = client.delete(f"/users/{created_user_id}")
    assert response.status_code == 200
    assert f"{created_user_id}" in response.json()["mensaje"]

def test_get_deleted_user():
    # Verificamos que el usuario fue eliminado
    response = client.get(f"/users/{created_user_id}")
    assert response.status_code == 404
