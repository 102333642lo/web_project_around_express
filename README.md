
# Proyecto 17:  Conexión a bases de datos
En este proyecto se desarrolló el backend para gestionar usuarios y tarjetas, actualizar perfiles y avatares, añadir y quitar likes y eliminar tarjetas. Se utilizaron JavaScript, Node.js, Express, MongoDB y Mongoose. También se implementaron validaciones y manejo de errores. El servidor se ejecuta en http://localhost:3000 mediante npm run start o npm run dev.

# Proyecto 16: Around Express

Este proyecto consiste en desarrollar un servidor web utilizando Node.js y Express para gestionar informacion de usuarios y tarjetas. El servidor permite consultar todos los usuarios, los ID de todos los usuarios y las tarjetas almacenadas en archivos JSON.

**Node.js:** entorno de ejecucion de JavaScript.

**Express:** permite crear el servidor y gestionar las rutas.

**File System (fs):** lee los archivos JSON.

**Path:** construye las rutas de los archivos.

**Nodemon:** reinicia automaticamente el servidor.

En el archivo app.js usamos GET /users para consultar todos los usuarios, GET /users/:userId para obtener los datos de un usuario mediante su ID y GET /card para obtener las tarjetas. Tambien tenemos el error 404 cuando no existen los usuarios o las rutas solicitadas.
