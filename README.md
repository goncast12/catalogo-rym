# Catálogo Rick and Morty

Proyecto de React con Vite que muestra un catálogo de personajes traídos de una API pública, con navegación mediante React Router y componentes de Ant Design.

## Alumno

**Nombre y Apellido:** Gonzalo F Castellano

## Cómo correr el proyecto

Requisitos: tener [Node.js](https://nodejs.org) instalado (versión 18 o superior).

1. Clonar el repositorio:

```bash
   git clone https://github.com/TU-USUARIO/catalogo-rym.git
   cd catalogo-rym
```

2. Instalar las dependencias:

```bash
   npm install
```

3. Iniciar el servidor de desarrollo:

```bash
   npm run dev
```

4. Abrir en el navegador la URL que muestra la terminal (normalmente http://localhost:5173).

## API utilizada

**Rick and Morty API** (pública, gratuita y sin API key).

- Documentación: https://rickandmortyapi.com/documentation
- URL base: `https://rickandmortyapi.com/api`

## Endpoints consumidos

| Endpoint | Uso en el proyecto |
|---|---|
| `GET /character?page=N` | Listado paginado de personajes en `/catalogo` |
| `GET /character?name=texto&page=N` | Búsqueda por nombre (`/catalogo?buscar=texto`) |
| `GET /character/:id` | Detalle de un personaje en `/catalogo/:id` |

Todos los llamados están centralizados en `src/services/api.js`.

## Rutas de la aplicación

| Ruta | Página |
|---|---|
| `/` | Home |
| `/catalogo` | Listado con buscador y paginación |
| `/catalogo/:id` | Detalle del personaje |
| `*` | 404 - No encontrado |

## Tecnologías

React, Vite, React Router (`react-router-dom`), Ant Design (`antd`), Axios.