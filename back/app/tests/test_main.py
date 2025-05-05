from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Prueba: crear usuario
def test_create_user():
    response = client.post("/users/", params={
        "name": "Laura",
        "email": "laura@example.com",
        "documento": "ABC123"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Laura"
    assert data["email"] == "laura@example.com"
    assert data["documento"] == "ABC123"

# Prueba: obtener lista de usuarios
def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Prueba: buscar usuario por ID
def test_search_user_by_id():
    # Crear usuario para prueba
    user = client.post("/users/", params={
        "name": "Carlos",
        "email": "carlos@example.com",
        "documento": "ID789"
    }).json()
    response = client.get(f"/users/search/?id={user['id']}")
    assert response.status_code == 200
    assert response.json()["name"] == "Carlos"

# Prueba: buscar usuario por nombre
def test_search_user_by_name():
    client.post("/users/", params={
        "name": "Sofia",
        "email": "sofia@example.com",
        "documento": "DOC456"
    })
    response = client.get("/users/search/?name=Sofia")
    assert response.status_code == 200
    assert response.json()["name"] == "Sofia"

# Prueba: buscar usuario por correo
def test_search_user_by_email():
    client.post("/users/", params={
        "name": "Diego",
        "email": "diego@example.com",
        "documento": "DOC789"
    })
    response = client.get("/users/search/?email=diego@example.com")
    assert response.status_code == 200
    assert response.json()["email"] == "diego@example.com"

# Prueba: buscar usuario por documento
def test_search_user_by_documento():
    client.post("/users/", params={
        "name": "Ana",
        "email": "ana@example.com",
        "documento": "DOC321"
    })
    response = client.get("/users/search/?documento=DOC321")
    assert response.status_code == 200
    assert response.json()["documento"] == "DOC321"

# Prueba: eliminar usuario por ID
def test_delete_user():
    # Crear usuario temporal
    response = client.post("/users/", params={
        "name": "Temporal",
        "email": "temp@example.com",
        "documento": "TEMP999"
    })
    user_id = response.json()["id"]

    # Eliminar usuario
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Usuario eliminado correctamente"

    # Verificar que ya no existe
    response = client.get(f"/users/search/?id={user_id}")
    assert response.status_code == 404
