# Se importa TestClient desde fastapi.testclient para realizar pruebas a la API
from fastapi.testclient import TestClient
# Se importa la instancia de la aplicación FastAPI desde el archivo correspondiente
from back.app.main import app

# Se crea un cliente de prueba que usará la aplicación para hacer solicitudes
client = TestClient(app)

# Prueba para verificar la creación de una película
def test_create_pelicula():
    # Se envía una solicitud POST al endpoint /peliculas/ con datos JSON de una película
    response = client.post("/peliculas/", json={"nombre de la pelicula": "jackiechan8", "director": "CHinCHan", "año": "2010"})
    # Se verifica que el código de respuesta sea 200 (éxito)
    assert response.status_code == 200
    # Se obtiene la respuesta en formato JSON
    data = response.json()
    # Se verifican los campos individuales en la respuesta
    assert data["nombre de la pelicula"] == "jackiechan8"
    assert data["director"] == "CHinCHan"
    assert data["año"] == "2010"
    # Se verifica que el campo 'id' exista en la respuesta
    assert "id" in data

# Prueba para obtener la lista de películas
def test_read_peliculas():
    # Se hace una solicitud GET al endpoint /peliculas/
    response = client.get("/peliculas/")
    # Se verifica que la respuesta sea exitosa
    assert response.status_code == 200
    # Se comprueba que el contenido de la respuesta sea una lista
    assert isinstance(response.json(), list)

# Prueba para obtener una película por su ID
def test_read_pelicula_by_id():
    # Primero se crea una película para obtener un ID válido
    create_response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "anio": "2010"})
    # Se extrae el ID de la película recién creada
    pelicula_id = create_response.json()["id"]
    # Se hace una solicitud GET al endpoint específico usando el ID
    response = client.get(f"/peliculas/{pelicula_id}")
    # Se verifica que la respuesta sea exitosa
    assert response.status_code == 200
    # Se obtiene la respuesta en JSON
    data = response.json()
    # Se verifica que el ID devuelto coincida con el que se pidió
    assert data["id"] == pelicula_id

# Prueba para eliminar una película usando parámetros detallados
def test_delete_pelicula_by_details():
    # Primero se crea una película para luego poder eliminarla
    create_response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "anio": "2010"})
    # Se extrae el ID de la película creada
    pelicula_id = create_response.json()["id"]
    # Se hace una solicitud DELETE pasando los parámetros necesarios en la URL
    response = client.delete("/peliculas/", params={"pelicula_id": pelicula_id, "nombrepelicula": "jackiechan8", "director": "CHinCHan"})
    # Se verifica que la eliminación haya sido exitosa
    assert response.status_code == 200
    # Se comprueba que el mensaje devuelto sea el esperado
    assert response.json() == {"message": "Pelicula eliminado por id"}
