FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Копируем сертификаты Минцифры
COPY russian_trusted_root_ca_pem.crt /usr/local/share/ca-certificates/russian_trusted_root_ca.crt
COPY russian_trusted_sub_ca_pem.crt /usr/local/share/ca-certificates/russian_trusted_sub_ca.crt

# Добавляем сертификаты с гарантированными переносами строк
RUN printf '\n' >> /etc/ssl/certs/ca-certificates.crt && \
    cat /usr/local/share/ca-certificates/russian_trusted_root_ca.crt >> /etc/ssl/certs/ca-certificates.crt && \
    printf '\n' >> /etc/ssl/certs/ca-certificates.crt && \
    cat /usr/local/share/ca-certificates/russian_trusted_sub_ca.crt >> /etc/ssl/certs/ca-certificates.crt && \
    printf '\n' >> /etc/ssl/certs/ca-certificates.crt

# Устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все Python-файлы
COPY *.py .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]