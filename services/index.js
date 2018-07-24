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

module.exports = createToken