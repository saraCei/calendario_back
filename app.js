const express=require('express');
const cors=require('cors')
const { dbConnect } = require('./database/config');

//DOT ENV
require('dotenv').config()

//Servidor express
const app=express()
const port=process.env.PORT;

//Conectar a la base de datos
dbConnect()

//CORS
app.use(cors())

// Configurar carpeta public
app.use(express.static(__dirname+'/public'));


// Parsear JSON
app.use(express.json())

// Rutas
app.use('/api/auth',require('./routes/authRoute'));
app.use('/api/events',require('./routes/calendarRoute'));

// app.get('/',(req,res)=>{
//     //res.send('Hola mundo')
//     res.json({
//         ok:true
//     })
// })


// Puerto a la escucha
app.listen(port, ()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)
})