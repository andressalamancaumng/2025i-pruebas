import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

test_user_data = {
    "name": "Carlos",
    "email": "carlos@example.com",
    "documento": "9876543210"
}

@pytest.fixture(scope="module")
def created_user():
    # Crear usuario
    response = client.post("/users/", params=test_user_data)
    assert response.status_code == 200
    data = response.json()
    yield data  # Pasamos los datos a otras pruebas
    # Eliminar usuario después de las pruebas
    client.delete(f"/users/{data['id']}")

def test_create_user(created_user):
    assert created_user["name"] == test_user_data["name"]
    assert created_user["email"] == test_user_data["email"]
    assert created_user["documento"] == test_user_data["documento"]

def test_read_users(created_user):
    response = client.get("/users/")
    assert response.status_code == 200
    users = response.json()
    assert any(user["email"] == test_user_data["email"] for user in users)

def test_get_user_by_id(created_user):
    response = client.get(f"/users/{created_user['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created_user["id"]
    assert data["email"] == created_user["email"]

def test_delete_user(created_user):
    response = client.delete(f"/users/{created_user['id']}")
    assert response.status_code == 200
    assert str(created_user["id"]) in response.json()["mensaje"]

def test_get_deleted_user(created_user):
    response = client.get(f"/users/{created_user['id']}")
    assert response.status_code == 404
