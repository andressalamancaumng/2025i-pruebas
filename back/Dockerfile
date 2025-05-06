FROM python:3.10-slim

WORKDIR /app

COPY ./app /app/app

RUN pip install fastapi uvicorn sqlalchemy pymysql pytest

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]