'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/api/usuario', (req,res)=>{
    res.status(200).send({usuarios: []})
})


app.post('/api/usuario', (req,res)=>{
    console.log(req.body)    
    res.status(200).send({message: "Usuario creado correctamente"})
})

app.put('/api/usuario', (req,res)=>{
    console.log(req.body)    
    res.status(200).send({message: "Usuario actualizado correctamente"})
})

app.delete('/api/usuario', (req,res)=>{
    console.log(req.body)    
    res.status(200).send({message: "Usuario borrado correctamente"})
})

app.get('*', function(req, res){
    	res.status(404).send('Petición incorrecta');
    })

mongoose.connect('mongodb://localhost:27017/socialcards', (err, res)=>{
    if (err) {
        console.log(`Error de conexion a la base de datos ${err}`)
    }
    console.log('Conectado a la base de datos correctamente...')

    app.listen(port, ()=>{
        console.log(`Corriendo en http://localhost:${port}`)
    })
})

