'use strict'

const express = require('express')
const userController = require('../controllers/user')
const api = express.Router()


//Devuelve solo un  usuario
api.get('/user/:id', userController.getUser)
//Devuelve todos los usuarios
api.get('/user',userController.getUsers)
//Crear un usuario
api.post('/user', userController.saveUser)
//Actualizar usuario
api.put('/user/:id', userController.updateUser)
//Borrar usuario
api.delete('/user/:id', userController.deleteUser)


api.get('*', function(req, res){
    res.status(404).send('Petición incorrecta');
})

module.exports = api