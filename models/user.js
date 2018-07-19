'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    name: String,
    picture: String,
    biography: String,
    userUrl: String,
    occupation: { type: String, enum: ['Student','Developer']},
    country: { type: String, enum: ['Spain','USA','France']},
    links: [String]
})

module.exports = mongoose.model('User', UserSchema)