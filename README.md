# 📚 Proyecto Backend FastAPI + MySQL + Pytest

Este proyecto es un ejemplo de backend utilizando **FastAPI** para la creación de APIs REST, **MySQL** como base de datos y **pytest** para la creación de pruebas unitarias.

---

## 🛠 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Python 3.10 o superior**
- **Docker Desktop** (para correr MySQL)
- **pip** actualizado (`python -m pip install --upgrade pip`)
- **(Opcional)** Postman o Insomnia para probar APIs manualmente

---

## 📦 Instalación del proyecto

1. **Clona el repositorio o descomprime el proyecto entregado:**

```bash
git clone https://github.com/andressalamancaumng/2025i-pruebas.git
```
o descarga el `.zip` entregado y descomprímelo en tu máquina.

2. **Entra al proyecto backend:**

```bash
cd back/
```

3. **Crea y activa un entorno virtual:**

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
```
ó
```bash
venv\Scripts\activate  # Windows
```

4. **Instala las dependencias:**

```bash
pip install -r app/requeriments.txt
```

---

## 🐬 Levantar base de datos MySQL en Docker

Corre el siguiente comando para crear y levantar un contenedor de MySQL:

```bash
docker run --name mysql-pruebas -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=testdb -p 3306:3306 -d mysql:8.0
```

---

## 🚀 Correr el servidor FastAPI

Con tu entorno virtual activo:

```bash
uvicorn app.main:app --reload
```

API Swagger disponible en:

- [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧪 Correr pruebas unitarias

1. Estando en la carpeta `back/`, ejecuta:

```bash
pytest
```

✅ Si tienes `pytest.ini` configurado así:

```ini
[pytest]
pythonpath = app
```
no necesitas hacer nada extra.

Si hay problemas de importación:

```bash
PYTHONPATH=. pytest  # Mac/Linux
set PYTHONPATH=. && pytest  # Windows CMD
$env:PYTHONPATH="." ; pytest  # Windows PowerShell
```

---

## 🎯 Notas importantes

- Asegúrate de tener **`__init__.py`** en `app/` para reconocerla como paquete Python.
- `pytest` busca archivos que comiencen `test_` y funciones que comiencen `test_`.
- Las pruebas están en `app/tests/test_main.py`.
- Se usa la base de datos `testdb` creada en Docker.

---

## 📚 Recursos útiles

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pytest Documentation](https://docs.pytest.org/en/stable/)
- [Docker Hub MySQL](https://hub.docker.com/_/mysql)

---

## ✍️ Autor

Proyecto preparado por **(Andrés Mauricio Salamanca Arias)**  
Curso de **Ingeniería de Software**
Ingenieria Multimedia
Universidad Militar Nueva Granada

---

# 🔥 ¡Ahora estás listo para desarrollar y probar tu API como un profesional!
