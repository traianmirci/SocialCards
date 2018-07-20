'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res)=>{
    if (err) {
        console.log(`Error de conexion a la base de datos ${err}`)
    }
    console.log('Conectado a la base de datos correctamente...')

    app.listen(config.port, ()=>{
        console.log(`Corriendo en http://localhost:${config.port}`)
    })
})

