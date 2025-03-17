# Sistema de Gestión de Matrículas - Backend

## Descripción
Este es el backend de un sistema de gestión de matrículas académicas desarrollado con Node.js y Express, utilizando MongoDB como base de datos. Permite la administración de estudiantes, materias y matrículas.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) para autenticación
- Express Validator para validación de datos
- CORS para seguridad de peticiones
- Dotenv para manejo de variables de entorno

## Estructura del Proyecto
```
mtdev2312-matriculas-backend/
├── README.md
├── package.json
├── .env.example
└── src/
    ├── index.js
    ├── server.js
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── auth_controller.js
    │   ├── enrollment_controller.js
    │   ├── students_controller.js
    │   └── subjects_controller.js
    ├── helpers/
    │   ├── auth_validation.js
    │   ├── enrollment_validation.js
    │   ├── student_validation.js
    │   ├── subject_validation.js
    ├── middlewares/
    │   ├── jwt.js
    │   └── middleware_validation.js
    ├── models/
    │   ├── enrollment_model.js
    │   ├── students_model.js
    │   ├── subjects_model.js
    │   └── user_model.js
    └── routers/
        ├── auth_routes.js
        ├── enrollment_routes.js
        ├── student_routes.js
        ├── subjects_routes.js
```

## Instalación y Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/MTDEV2312/Matriculas-BackEnd.git
   ```
2. Instalar dependencias:
   ```sh
   cd matriculas-backend
   npm install
   ```
3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` y renombrarlo como `.env`.
   - Completar la variable `MONGODB_URI` con la URL de conexión a la base de datos.

## Uso
### Iniciar el servidor
Ejecutar en modo desarrollo:
```sh
npm run dev
```
Ejecutar en modo producción:
```sh
npm start
```

## Endpoints Principales
### Autenticación
- `POST /api/login`: Iniciar sesión y obtener un token JWT.

### Estudiantes
- `GET /api/students`: Obtener todos los estudiantes.
- `GET /api/students/:cedula`: Obtener un estudiante por cédula.
- `POST /api/students`: Registrar un nuevo estudiante.
- `PATCH /api/students/:id`: Actualizar datos de un estudiante.
- `DELETE /api/students/:id`: Eliminar un estudiante.

### Materias
- `GET /api/subjects`: Obtener todas las materias.
- `GET /api/subjects/:codigo`: Obtener una materia por código.
- `POST /api/subjects`: Registrar una nueva materia.
- `PATCH /api/subjects/:id`: Actualizar datos de una materia.
- `DELETE /api/subjects/:id`: Eliminar una materia.

### Matrículas
- `POST /api/enrollment/register`: Registrar una nueva matrícula.
- `GET /api/enrollment`: Obtener todas las matrículas.
- `GET /api/enrollment/:codigo`: Obtener una matrícula por código.
- `PATCH /api/enrollment/update/:id`: Actualizar datos de una matrícula.
- `DELETE /api/enrollment/delete/:id`: Eliminar una matrícula.

## Autenticación
Para acceder a los endpoints protegidos, se requiere un token JWT que debe enviarse en la cabecera de la petición:
```sh
Authorization: Bearer <token>
```

## Contribución
Si deseas contribuir, por favor abre un issue o un pull request en el repositorio.

## Licencia
Este proyecto está bajo la licencia MIT.

