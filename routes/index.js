'use strict'

const express = require('express')
const userController = require('../controllers/user')
const linkController = require('../controllers/link')
const auth = require('../middlewares/auth')

const api = express.Router()


//Devuelve solo un  usuario
api.get('/user/:id', userController.getUser)
//Devuelve  un  usuario a partir de @username
api.get('/userByUsername/:username', userController.getUserByUsername)
//Devuelve todos los usuarios
api.get('/user',userController.getUsers)
//Crear un usuario
api.post('/user', userController.saveUser)
//Actualizar usuario
api.put('/user', userController.updateUser)
//Borrar usuario
api.delete('/user/:id', userController.deleteUser)
//signup

api.post('/signUp', userController.signUp)
api.post('/signIn', userController.signIn)

//cambiar avatar
api.put('/user/updateUserAvatar', userController.updateUserAvatar)


//instagram
api.get('/user/saveInstagram/:accesstoken/:postslimit',linkController.saveInstagram)
api.get('/user/showInstagram/:accesstoken',userController.showInstagram)
api.get('/user/obtenerImagenPerfilInstagram/:accesstoken',userController.obtenerImagenPerfilInstagram)


//Devuelve solo un  link
api.get('/link/:id', linkController.getLink)
//Devuelve todos los links
api.get('/link',linkController.getLinks)
//Crear un link
api.post('/link', linkController.saveLink)
//Actualizar link
api.put('/link', linkController.updateLink)
//Borrar link
api.delete('/link/:id', linkController.deleteLink)
//devuelve los links de un email
api.get('/linksUsuario', linkController.getLinksUser)


//privados
api.get('/edituser', auth.isAuth, function(req,res){
    res.status(200).send({message: 'Tienes permiso'})
})

//usuario logueado
//Devuelve todos los usuarios
api.get('/loggedUser', auth.isAuth,userController.getUser)

api.get('*', function(req, res){
    res.status(404).send('Petición incorrecta');
})

module.exports = api