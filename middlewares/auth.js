'use strict'

const services = require('../services/')


//como es un middleware me hace falta tb next ppara pasar al siguiente
function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: "No tienes autorización"})
    }

    const token = req.headers.authorization.split(' ')[1]

    services.decodeToken(token)
    .then (response=>{
        req.user = response
        next()
    })
    .catch(response=>{
        res.status(response.status).send("Token invalido")
    })
}

module.exports = {
    isAuth
}