# Frontend - AutocobroApp

Aplicación React con TypeScript desarrollada con Vite.

## Estructura del Proyecto

```
frontend-update/
├── src/
│   ├── App.tsx                    # Componente principal
│   ├── App.css                    # Estilos principales
│   ├── main.tsx                   # Punto de entrada
│   ├── index.css                  # Estilos globales
│   ├── config/
│   │   └── api.ts                 # Configuración de API
│   ├── types/
│   │   └── product.ts             # Tipos TypeScript
│   ├── services/
│   │   └── productService.ts      # Servicio de API
│   └── components/
│       ├── ProductForm.tsx        # Formulario de productos
│       ├── ProductForm.css
│       ├── ProductList.tsx        # Lista de productos
│       ├── ProductList.css
│       ├── ConfirmModal.tsx       # Modal de confirmación
│       ├── ConfirmModal.css
│       ├── Notification.tsx       # Notificaciones
│       └── Notification.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── vercel.json                    # Configuración para Vercel
```

## Instalación Rápida

```powershell
# Instalar dependencias
npm install

# Configurar variables de entorno
Copy-Item .env.example .env
# Editar .env con la URL de tu backend

# Ejecutar en desarrollo
npm run dev
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar linter

## Características

- ✅ TypeScript para tipado seguro
- ✅ Componentes reutilizables
- ✅ Manejo de estado con hooks
- ✅ Validación de formularios
- ✅ Notificaciones de feedback
- ✅ Modal de confirmación
- ✅ Búsqueda de productos en tiempo real
- ✅ Diseño responsive
- ✅ Preparado para Vercel

---

## Template Information

This template uses:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) with Babel for Fast Refresh
- React Compiler is enabled on this template

For more information about the template configuration, see the [Vite documentation](https://vite.dev/).
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
