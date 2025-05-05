from fastapi.testclient import TestClient  # Importa TestClient para realizar pruebas en la API
from app.main import app  # Importa la aplicación FastAPI desde el archivo principal

# Crea un cliente de prueba para interactuar con la API
client = TestClient(app)

# Prueba para crear un nuevo usuario
def test_create_user():
    # Envía una solicitud POST para crear un usuario
    response = client.post("/users/", params={"name": "Juan", "email": "juan@example.com", "document": "123"})
    assert response.status_code == 200  # Verifica que la respuesta sea exitosa
    assert response.json()["name"] == "Juan"  # Verifica que el nombre del usuario sea correcto

# Prueba para obtener todos los usuarios
def test_read_users():
    # Envía una solicitud GET para obtener todos los usuarios
    response = client.get("/users/")
    assert response.status_code == 200  # Verifica que la respuesta sea exitosa
    assert isinstance(response.json(), list)  # Verifica que la respuesta sea una lista

# Prueba para obtener un usuario por su correo electrónico
def test_get_user_by_email():
    # Envía una solicitud GET para buscar un usuario por su email
    response = client.get("/user/", params={"email": "juan@example.com"})
    assert response.status_code == 200  # Verifica que la respuesta sea exitosa
    assert response.json()["email"] == "juan@example.com"  # Verifica que el email sea correcto

# Prueba para eliminar un usuario
def test_delete_user():
    # Crea un nuevo usuario para eliminar
    create = client.post("/users/", params={"name": "Pedro", "email": "pedro@example.com", "document": "456"})
    user_id = create.json()["id"]  # Obtiene el ID del usuario creado

    # Envía una solicitud DELETE para eliminar el usuario
    delete = client.delete(f"/users/{user_id}")
    assert delete.status_code == 200  # Verifica que la eliminación sea exitosa

    # Verifica que el usuario ya no exista
    get = client.get(f"/user/", params={"id": user_id})
    assert get.json() is None  # Verifica que el usuario eliminado no esté en la base de datos