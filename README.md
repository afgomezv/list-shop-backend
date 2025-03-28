# 🛒 Backend - Lista de Compras

Este es el backend de la aplicación web para gestionar listas de compras en tiempo real. Proporciona una API REST y soporte para WebSockets, permitiendo a los usuarios crear, editar y eliminar artículos con actualizaciones instantáneas. 🚀

## 🏗️ Tecnologías Utilizadas
- **Node.js** - Entorno de ejecución para JavaScript.
- **Express.js** - Framework ligero para manejar rutas y peticiones HTTP.
- **Socket.IO** - Proporciona funcionalidad en tiempo real mediante WebSockets.
- **PostgreSQL** - Base de datos relacional para almacenar listas de compras.
- **Sequelize** - ORM para interactuar con la base de datos.
- **CORS** - Para permitir el acceso desde el frontend.
- **dotenv** - Para la gestión de variables de entorno.

## 📌 Características
- ✅ **Gestor de Listas de Compras:** Permite a los usuarios crear, ver, editar y eliminar artículos de su lista.
- ✅ **Estado de Artículos:** Los usuarios pueden marcar elementos como "comprados".
- ✅ **Notificaciones en Tiempo Real:** Mediante Socket.IO, los cambios en la lista se actualizan instantáneamente para todos los usuarios conectados.
- ✅ **Persistencia de Datos:** Usa MySQL o SQLite para almacenar la información de forma segura.

## 🚀 Instalación y Ejecución
### 1️⃣ Clonar el repositorio
```sh
  git clone https://github.com/afgomezv/list-shop-backend.git
  cd lista-list-shop-backend
```
### 2️⃣ Instalar dependencias
```sh
  npm install
```
### 3️⃣ Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```env
DATABASE_URL=postgres://usuario:password@host:puerto/dbname
FRONTEND_URL= http://localhost:5173
JWT_TOKEN=Mywordsecret
```

### 4️⃣ Ejecutar el servidor
```sh
  npm run dev
```

## 📜 Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente. 🚀

