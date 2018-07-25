'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user');


const LinkSchema = new mongoose.Schema({
    name: String,
    url: String,
    clicks: [{ visits: Number, date: Date }],
    type: String, enum: ['facebook', 'twitter', 'instagram','twitch','youtube','tumblr'],
    active: Boolean,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
      },
    publicationdate: {
    type: Date,
    default: Date.now()
    },
})



module.exports = mongoose.model('Link', LinkSchema)