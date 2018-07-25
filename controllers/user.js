'use strict'

const User = require('../models/user.js')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')


function saveUser(req,res){
    console.log('POST /api/usuario')
    console.log(req.body)

    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password
    user.signUpDate = req.body.signUpDate
    user.lastLogin = req.body.lastLogin
    user.picture = req.body.picture;
    user.biography = req.body.biography;
    user.userUrl = req.body.userUrl;
    user.occupation = req.body.occupation;
    user.country = req.body.country;

    for (e in req.body.links){
        user.links.push(e)
    }

    user.save((err, userStored)=>{
        if (err){
            res.status(500).send({message: `Error al guardar el usuario ${err}`})
        }else{
            res.status(200).send({user: userStored})
        }

        
    })
}

function getUser(req,res){
    let idUsuario = req.params.id;
    console.log("busco")
    console.log(idUsuario)
    User.findById(idUsuario,(err, user)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})

        res.status(200).send({user})
    })
}


function getUsers(req,res){
    User.find({}, (err, users)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!users) return res.status(404).send({message: `No existen usuarios`})

        res.status(200).send({users})
    })
}

function updateUser(req,res){
    let idUsuario = req.params.id;
    let update = req.body

    User.findByIdAndUpdate(idUsuario,update, (err, userUpdated)=>{
        if(err) return res.status(500).send({ message: `Error en la actualización ${err}`})

        res.status(200).send({userUpdated})
    })
}

function deleteUser(req,res){
    let idUsuario = req.params.id;
    
    User.findById(idUsuario, (err, user)=>{
        if (err) res.send(500).send(`Error al borrar el usuario ${err}`)

        user.remove(err => {
            if (err) res.send(500).send(`Error al borrar el usuario ${err}`)
            res.status(200).send({message: "Usuario borrado correctamente"})
        })
    })
}


function signUp(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        //La contraseña no la guardo porque de esto ya me encargo con la 
        //funcion mongoose UserSchema.pre en el modelo de usuario,hasheada
        //password: req.body.password,
        //signup tampoco hace falta porque la almacena por defecto con la fecha actual
        //signUpDate: req.body.signUpDate,
        password: req.body.password
    })

    user.save((err)=>{
        if(err) res.send(500).send({message: `Error al crear el usuario ${err}`})
        console.log("porqueno")
        return res.status(200).send({token: service.createToken(user)})
    })
}



function signIn(req, res){
    //console.log("hmm",{email: req.body},"hmm")
    User.findOne({email: req.body.email},(err,user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})
        else{
            if(req.body.password && user.password){
                
                bcrypt.compare(req.body.password,user.password, function(err, comparePassword) {
                    console.log(user.password)

                    if (err) return res.status(500).send({ message: err });
                    if (comparePassword == false) return res.status(403).send({ message: 'Datos incorrectos' });
    
                    res.status(200).send({
                        message: 'Login correcto',
                        user_id: user.id,
                        token: service.createToken(user),
                    });
                });
                
            } else {
            res.status(401).send('Login incorrecto');

            }}
    })
}


module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    saveUser,
    signIn,
    signUp
}