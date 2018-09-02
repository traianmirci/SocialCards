'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user');


const LinkSchema = new mongoose.Schema({
    name: String,
    url: String,
    clicks: [{ visits: Number, date: Date }],
    type: String, enum: ['facebook', 'twitter', 'instagram','twitch','youtube','tumblr','link'],
    active: Boolean,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
      },
    publicationdate: {
    type: Date,
    default: Date.now()
    },

    twitter: {
        username: {type: String},
        postslimit: {type: Number}
    },
    instagram: {
        accesstoken: {type: String},
        postslimit: {type: Number},
        username: String,
        profile_picture: String,
    },

    
    facebooktype: String, enum: ['fbpagina','fbvideo','fbpublicacion','fbcomentarios'],

    youtubetype: String, enum: ['video','playlist']

    

})




module.exports = mongoose.model('Link', LinkSchema)