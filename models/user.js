'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},
    signUpDate: {type: Date, default: Date.now()},
    lastLogin: Date,
    picture: String,
    biography: String,
    userUrl: String,
    occupation: { type: String, enum: ['Student','Developer']},
    country: { type: String, enum: ['Spain','USA','France']}
})

UserSchema.pre('save', function(next){
    let user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null,(err,hash)=>{
            if(err) return next(err)

            user.password = hash
            next()
        } )
    })
})

module.exports = mongoose.model('User', UserSchema)