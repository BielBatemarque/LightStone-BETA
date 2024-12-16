FROM python:3.10-slim

WORKDIR /app

# Instalar dependências
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o projeto inteiro para o container
COPY backend/ /app/backend/

EXPOSE 8000

# Comando para rodar o servidor com o settings correto
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]