import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal
from app.models import User

client = TestClient(app)

# Fixture que borra todos los usuarios antes de cada prueba
@pytest.fixture(autouse=True)
def clean_db():
    db = SessionLocal()
    db.query(User).delete()
    db.commit()
    db.close()

def test_create_user():
    response = client.post("/users/", params={"name": "Juan", "email": "juan@example.com", "document": "123456789"})
    assert response.status_code == 200
    assert response.json()["name"] == "Juan" 

def test_get_and_delete_user_by_id():
    response = client.post("/users/", params={"name": "Carlos", "email": "@example.com", "document": "12767890"})
    assert response.status_code == 200
    print("Usuario creado:", response.json())
    created_user = response.json()
    user_id = created_user["id"]
    response = client.delete("/users/delete_for_id", params={"id": user_id})
    print("Resultado delete:", response.status_code, response.json() if response.status_code == 200 else "Usuario no encontrado")

    assert response.status_code == 200

def test_find_user_by_any_field():
    user_data = {"name": "Laura", "email": "lu@example.com", "document": "199999999"}
    create_response = client.post("/users/", params=user_data)
    assert create_response.status_code == 200
    created_user = create_response.json()
    user_id = created_user["id"]

    # Buscar por ID
    response = client.get("/users/search", params={"id": user_id})
    assert response.status_code == 200
    assert response.json()["email"] == "lu@example.com"  # <- corregido

    # Buscar por nombre
    response = client.get("/users/search", params={"name": "Laura"})
    assert response.status_code == 200
    assert response.json()["document"] == "199999999"

    # Buscar por email
    response = client.get("/users/search", params={"email": "lu@example.com"})
    assert response.status_code == 200
    assert response.json()["name"] == "Laura"

    # Buscar por documento
    response = client.get("/users/search", params={"document": "199999999"})
    assert response.status_code == 200
    assert response.json()["email"] == "lu@example.com"
