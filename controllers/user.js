'use strict'

const User = require('../models/user.js')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')
const config = require('../config')
var jwt = require('jwt-simple');
const services = require('../services/')




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


function getUserByUsername(req,res){
    //console.log(req.params.username)
    

    User.find({ username: req.params.username},(err, user)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})
        if(user == 0 ) return res.status(404).send({message: `El usuario no existe`})
        res.status(200).send({user})
    })
}


function getUser(req,res){
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;

    
    User.findById(idUsuario,(err, user)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})

        res.status(200).send({user})
        console.log('desde aqui')
    })
}


function getUsers(req,res){
    
    //console.log('token',req.headers['authorization'].replace("Bearer ",""))
    

    //console.log(req.headers.authorization)

//    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

   // console.log(decoded);

    User.find({}, (err, users)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!users) return res.status(404).send({message: `No existen usuarios`})

        res.status(200).send({users})
    })
}

function updateUser(req,res){
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;
    
    User.findByIdAndUpdate(idUsuario,req.body,{new: true}, (err, userUpdated)=>{
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
    const userReq = new User({
        name: req.body.name,
        email: req.body.email,
        //La contraseña no la guardo porque de esto ya me encargo con la 
        //funcion mongoose UserSchema.pre en el modelo de usuario,hasheada
        //password: req.body.password,
        //signup tampoco hace falta porque la almacena por defecto con la fecha actual
        //signUpDate: req.body.signUpDate,
        password: req.body.password
    })

    User.findOne({email: req.body.email},(err,user)=>{
        if(!user && !err){
            userReq.save((err)=>{
                if(err) res.status(500).send({message: `Error al crear el usuario ${err}`})
                return res.status(200).send({token: service.createToken(userReq)})
            })
        }
        if(user){
            return res.status(409).send({message: 'Usuario ya registrado'})
        }
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
    signUp,
    getUserByUsername
}