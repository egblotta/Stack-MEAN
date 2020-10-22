const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(cors());                //agrega cabeceras a las peticiones para la comunicacion entre servidores
app.use(express.json());        //convierte los datos que recibe el servidor a un formato js

app.use('/api', require('./routes/index'));         //todas las rutas tiene que tener /api

app.listen(3000);
console.log('Server on port', 3000);