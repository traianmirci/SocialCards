'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
function createToken(user){
    const payload = {
        sub: user._id,
        //creacion token
        iat: moment().unix(),
        //caducidad token,15 dias
        exp: moment().add(15,'days').unix(),
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
}

function decodeToken(token){
    const decoded = new Promise((resolve,reject)=>{
        try {
            const payload = jwt.decode(token,config.SECRET_TOKEN)

            if(payload.exp <= moment.unix()){
                reject({
                    status: 401,
                    message: 'Token expired'
                })
            }

            resolve(payload.sub)

        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    })

    //devuelvo la promesa
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}