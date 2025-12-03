# Script para iniciar el servidor FastAPI
# Uso: .\start.ps1

$env:DATABASE_URL="postgresql://postgres:root@localhost:5432/gestion-productos"
$env:ALLOWED_ORIGINS="*"

Write-Host "Iniciando servidor FastAPI..." -ForegroundColor Green
& ".\.venv\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
