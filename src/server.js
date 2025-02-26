import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routers/auth_routes.js'
import subject from './routers/subjects_routes.js'
import student from './routers/student_routes.js'
import enrollment from './routers/enrollment_routes.js'




// Inicializaciones

const app = express();
dotenv.config();

// Configuraciones

app.set('port', process.env.PORT || 4000);
app.use(cors());

// Middlewares
app.use(express.json());


// Variables Globales

// Rutas

app.get('/',(req,res)=>{
    res.send('Server on 👨‍💻✅');
})


app.use('/api/',auth)

app.use('/api/',subject)

app.use('/api/',student)

app.use('/api/',enrollment)


//Rutas no encontradas

app.use((req,res)=>res.status(404).send("EndPoint no encontrado - 404 ❌"))

// Exportar la instancia de express por medio de app
export default  app;