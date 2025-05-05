from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

dummy_user = {
    "name": "Juan",
    "email": "juanse@example.com",
    "document": "123456789"
}

user_id = None  

def test_create_user():
    global user_id
    response = client.post("/users/", json=dummy_user)
    assert response.status_code == 200
    user_id = response.json()["id"]

def test_get_by_id():
    global user_id
    response = client.get(f"/users/search?id={user_id}")
    assert response.status_code == 200
    assert response.json()["email"] == dummy_user["email"]

def test_get_by_document():
    response = client.get(f"/users/search?document={dummy_user['document']}")
    assert response.status_code == 200
    assert response.json()["name"] == dummy_user["name"]

def test_delete_user():
    global user_id
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted"}

def test_confirm_user_deleted():
    global user_id
    response = client.get(f"/users/search?id={user_id}")
    assert response.status_code == 404
