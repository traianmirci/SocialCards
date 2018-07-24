'use strict'

const mongoose = require('mongoose')
const User = requiere('../models/user')
const service = requiere('../services')

function signUp(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        //La contraseña no la guardo porque de esto ya me encargo con la 
        //funcion mongoose UserSchema.pre en el modelo de usuario,hasheada
        //password: req.body.password,
        //signup tampoco hace falta porque la almacena por defecto con la fecha actual
        //signUpDate: req.body.signUpDate,
    })

    user.save((err)=>{
        if(err) res.send(500).send({message: `Error al crear el usuario ${err}`})

        return res.send(200).send({token: service.createToken(user)})
    })
}



function signIn(req, res){

}

module.exports = {
    signIn,
    signUp
}