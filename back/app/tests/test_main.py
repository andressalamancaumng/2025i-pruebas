from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine

client = TestClient(app)

test_user = {
    "name": "Juan",
    "email": "juan@example.com",
    "documento": "1007298102"
}

def test_create_user():
    response = client.post("/users/", params=test_user)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == test_user["name"]
    assert data["email"] == test_user["email"]
    assert data["documento"] == test_user["documento"]


def test_read_user_by_name():
    response = client.get(f"/users/?name={test_user['name']}")
    assert response.status_code == 200
    assert any(user["name"] == test_user["name"] for user in response.json())

def test_read_user_by_email():
    response = client.get(f"/users/?email={test_user['email']}")
    assert response.status_code == 200
    assert any(user["email"] == test_user["email"] for user in response.json())

def test_read_user_by_documento():
    response = client.get(f"/users/?documento={test_user['documento']}")
    assert response.status_code == 200
    assert any(user["documento"] == test_user["documento"] for user in response.json())

def test_delete_user():
    response = client.delete(f"/users/?documento={test_user['documento']}")
    assert response.status_code == 200
    assert response.json()["message"] == "Usuario eliminado exitosamente"

def test_user_deleted():
    response = client.get(f"/users/?documento={test_user['documento']}")
    assert response.status_code == 200
    assert len(response.json()) == 0