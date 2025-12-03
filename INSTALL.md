# ============================================================================
# GUÍA RÁPIDA DE INSTALACIÓN Y CONFIGURACIÓN
# ============================================================================

## Instalación del Proyecto

### 1. Backend (FastAPI + PostgreSQL)

```powershell
# Navegar a la carpeta backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Copiar archivo de configuración
Copy-Item .env.example .env

# Editar .env con tus credenciales de PostgreSQL
# DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_de_la_db
```

### 2. Base de Datos PostgreSQL

1. Instalar PostgreSQL desde https://www.postgresql.org/download/
2. Crear una base de datos llamada `autocobro_db`
3. Abrir pgAdmin 4
4. Copiar y ejecutar el contenido de `backend/database/estructura.sql`

### 3. Frontend (React + TypeScript)

```powershell
# Navegar a la carpeta frontend
cd frontend-update

# Instalar dependencias
npm install

# Copiar archivo de configuración
Copy-Item .env.example .env

# El archivo .env ya está configurado para desarrollo local
```

### 4. Ejecutar el Proyecto

**Terminal 1 - Backend:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

**Terminal 2 - Frontend:**
```powershell
cd frontend-update
npm run dev
```

### 5. Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

---

## Solución Rápida de Problemas

### Error: No se puede conectar a PostgreSQL
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `backend/.env`
- Prueba la conexión con pgAdmin 4

### Error: CORS Policy
- Verifica que `ALLOWED_ORIGINS` en `backend/.env` incluya http://localhost:5173
- Reinicia el servidor backend

### Error: Módulo no encontrado (Python)
- Activa el entorno virtual: `.\venv\Scripts\Activate.ps1`
- Reinstala: `pip install -r requirements.txt`

### Error: Dependencias no instaladas (npm)
- Borra `node_modules` y `package-lock.json`
- Ejecuta `npm install` nuevamente

---

Para más detalles, consulta el README.md principal del proyecto.
