'use strict'

const jwt = require('jwt')
const moment = require('moment')
const config = require('../config')

//como es un middleware me hace falta tb next ppara pasar al siguiente
function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.send(403).send({message: "No tienes autorización"})
    }

    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.decode(token, config.SECRET_TOKEN)

    if(payload.exp <= moment.unix()){
        return res.send(401).send({message: 'El token ha caducado'})
    }

    req.user = payload.sub
    next()
}

module.exports = {
    isAuth
}