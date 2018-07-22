'use strict'

const express = require('express')
const userController = require('../controllers/user')
const linkController = require('../controllers/link')

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



//Devuelve solo un  link
api.get('/link/:id', linkController.getLink)
//Devuelve todos los links
api.get('/link',linkController.getLinks)
//Crear un link
api.post('/link', linkController.saveLink)
//Actualizar link
api.put('/link/:id', linkController.updateLink)
//Borrar link
api.delete('/link/:id', linkController.deleteLink)


api.get('*', function(req, res){
    res.status(404).send('Petición incorrecta');
})

module.exports = api