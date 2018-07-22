'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const LinkSchema = new mongoose.Schema({
    name: String,
    url: String,
    clicks: [{ visits: Number, date: Date }],
    active: Boolean
})



module.exports = mongoose.model('Link', LinkSchema)