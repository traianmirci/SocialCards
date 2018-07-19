'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//DB SCHEMAS
const User = require('./models/user.js')

const app = express()
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Devuelve solo un  usuario
app.get('/api/user/:id', (req,res)=>{
    let idUsuario = req.params.id;
    console.log("busco")
    console.log(idUsuario)
    User.findById(idUsuario,(err, user)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})

        res.status(200).send({user})
    })
})

//Devuelve todos los usuarios
app.get('/api/user', (req,res)=>{
    User.find({}, (err, users)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!users) return res.status(404).send({message: `No existen usuarios`})

        res.status(200).send({users})
    })
})

//Crear un usuario
app.post('/api/user', (req,res)=>{
    console.log('POST /api/usuario')
    console.log(req.body)

    let user = new User();
    user.name = req.body.name;
    user.picture = req.body.picture;
    user.biography = req.body.biography;
    user.userUrl = req.body.userUrl;
    user.occupation = req.body.occupation;
    user.country = req.body.country;
    user.userUrl = req.body.userUrl;

    for (e in req.body.links){
        user.links.push(e)
    }

    user.save((err, userStored)=>{
        if (err){
            res.status(500).send({message: `Error al guardar el usuario ${err}`})
        }

        res.status(200).send({user: userStored})
    })
})

//Actualizar usuario
app.put('/api/user/:id', (req,res)=>{
    let idUsuario = req.params.id;
    let update = req.body

    User.findByIdAndUpdate(idUsuario,update, (err, userUpdated)=>{
        if(err) return res.status(500).send({ message: `Error en la actualización ${err}`})

        res.status(200).send({userUpdated})
    })
})

//Borrar usuario
app.delete('/api/user/:id', (req,res)=>{
    let idUsuario = req.params.id;
    
    User.findById(idUsuario, (err, user)=>{
        if (err) res.send(500).send(`Error al borrar el usuario ${err}`)

        user.remove(err => {
            if (err) res.send(500).send(`Error al borrar el usuario ${err}`)
            res.status(200).send({message: "Usuario borrado correctamente"})
        })
    })
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

