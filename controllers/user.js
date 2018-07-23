'use strict'

const User = require('../models/user.js')

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

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    saveUser
}