# Se importan módulos necesarios para modificar el path del sistema
import sys
import os

# Se añade al path actual el directorio raíz del proyecto (dos niveles arriba)
# Esto permite importar módulos desde otras partes del proyecto
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Se importa TestClient para hacer pruebas sobre la API
from fastapi.testclient import TestClient
# Se importa la instancia de la aplicación FastAPI desde app.main
from app.main import app

# Se crea un cliente de prueba para simular peticiones HTTP a la aplicación
client = TestClient(app)

# Prueba unitaria para la creación de una película
def test_crear_pelicula():
    # Se realiza una petición POST al endpoint /peliculas/ con datos de una película
    response = client.post("/peliculas/", json={"nombre de la pelicula": "jackiechan8", "director": "CHinCHan", "año": "2010"})
    # Se espera un código de estado 200 (éxito)
    assert response.status_code == 200
    # Se obtiene la respuesta como diccionario
    data = response.json()
    # Se verifican los valores retornados
    assert data["nombre de la pelicula"] == "jackiechan8"
    assert data["director"] == "CHinCHan"
    assert data["año"] == "2010"
    # Se comprueba que el campo 'id' esté presente en la respuesta
    assert "id" in data

# Prueba unitaria para listar todas las películas
def test_listar_peliculas():
    # Se realiza una petición GET al endpoint /peliculas/
    response = client.get("/peliculas/")
    # Se espera un código de estado 200 (éxito)
    assert response.status_code == 200
    # Se obtiene la respuesta
    data = response.json()
    # Se verifica que la respuesta sea una lista (de películas)
    assert isinstance(data, list)

# Prueba unitaria para eliminar una película por su ID
def test_eliminar_pelicula_por_id():
    # Primero se crea una película para obtener un ID válido
    create_response = client.post("/peliculas/", json={"nombre de la pelicula": "jackiechan8", "director": "CHinCHan", "año": "2010"})
    # Se asegura que la creación fue exitosa
    assert create_response.status_code == 200
    # Se obtiene el ID de la película creada
    pelicula_id = create_response.json()["id"]

    # Se realiza una petición DELETE al endpoint correspondiente usando el ID
    response = client.delete(f"/peliculas/{pelicula_id}")
    # Se espera una respuesta con código 200 y el mensaje de eliminación
    assert response.status_code == 200
    assert response.json() == {"message": "Pelicula eliminada"}

    # Se verifica que al intentar obtener la película eliminada se reciba un 404
    get_response = client.get(f"/peliculas/{pelicula_id}")
    assert get_response.status_code == 404
