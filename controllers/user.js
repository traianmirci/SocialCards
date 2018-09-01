'use strict'

const User = require('../models/user.js')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')
const config = require('../config')
var jwt = require('jwt-simple');
const services = require('../services/')
const https = require('https');
const crypto = require('crypto')







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

    user.gravatar();

    user.save((err, userStored)=>{
        if (err){
            res.status(500).send({message: `Error al guardar el usuario ${err}`})
        }else{
            res.status(200).send({user: userStored})
        }

        
    })
}



function getUserByUsername(req,res){    
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
    console.log(req.url)
    
    User.findById(idUsuario,(err, user)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})
        
        
        res.status(200).send({user})
        //console.log('desde aqui',user.gravatar())
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
    console.log("edito",req.body)

    if(req.body.email!=null){
        const md5 = crypto.createHash('md5').update(req.body.email).digest('hex')
        let gravatar = `https://gravatar.com/avatar/${md5}?s=200&d=retro`
        console.log('mi gravatar',gravatar)
        req.body.gravatar = gravatar;
        console.log('lo inserto?',req.body.gravatar)
    }
   
    
    User.findByIdAndUpdate(idUsuario,req.body,{new: true}, (err, userUpdated)=>{
        if(err) return res.status(500).send({ message: `Error en la actualización ${err}`})
    
        res.status(200).send({userUpdated})
        console.log("el usuario updated".userUpdated)
    })
}

function updateUserAvatar(req,res){
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;

    console.log(req.body,"?")
    User.findByIdAndUpdate(idUsuario,req.body,{new: true}, (err, userUpdated)=>{
        if(err) return res.status(500).send({ message: `Error en la actualización ${err}`})
    
        res.status(200).send({userUpdated})
        console.log("el usuario updated".userUpdated)
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
    const md5 = crypto.createHash('md5').update(req.body.email).digest('hex')
    let pgravatar = `https://gravatar.com/avatar/${md5}?s=200&d=retro`

    const userReq = new User({
        name: req.body.name,
        email: req.body.email,
        //La contraseña no la guardo porque de esto ya me encargo con la 
        //funcion mongoose UserSchema.pre en el modelo de usuario,hasheada
        //password: req.body.password,
        //signup tampoco hace falta porque la almacena por defecto con la fecha actual
        //signUpDate: req.body.signUpDate,
        password: req.body.password,
        gravatar: pgravatar,
        //asigno tambien avatar como gravatar para tener al principio un avatar,despues
        //el avatar se podra cambiando desde /user
        avatar: pgravatar
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
                    //console.log(user.username)


                    if (err) return res.status(500).send({ message: err });
                    if (comparePassword == false) return res.status(403).send({ message: 'Datos incorrectos' });
    
                    res.status(200).send({
                        message: 'Login correcto',
                        user_id: user.id,
                        username: user.username,
                        token: service.createToken(user),
                    });
                });
                
            } else {
            res.status(401).send('Login incorrecto');

            }}
    })
}

function saveInstagram(req,res){
    console.log("entro")
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;

    var parametro = req.params.accesstoken.replace("#access_token=","");
    //usernuevo.token = 'hola';

    console.log(req.params.accesstoken)
    
    User.findByIdAndUpdate(idUsuario,{ instagramToken : req.params.accesstoken},{new: true, strict: false}, (err, userUpdated)=>{
        if(err) return res.status(500).send({ message: `Error en la actualización ${err}`})
        userUpdated.token = req.params.accesstoken;
        
        res.status(200).send({userUpdated})
    })
}

function showInstagram(req,res){
    var tokenInstagram = req.params.accesstoken;
    peticionAInstagram(res,tokenInstagram)

}


function peticionAInstagram(res,tokenInstagram){
    https.get('https://api.instagram.com/v1/users/self/media/recent/?access_token='.concat(tokenInstagram), res2 => {
        res2.setEncoding("utf8");
        let body = "";
        res2.on("data", data => {
          body += data;
        });
        res2.on("end", () => {
          var resultado = JSON.parse(body);

          devolverInstagramJson(res,resultado)
        });
      });
}
//hago otra funcion auxiliar para poder esperar a que se haga la peticion anterior de get
function devolverInstagramJson(res,body){
    res.status(200).send(body)
}

//para devolver la imagen de perfil a partir de un accesstoken
function obtenerImagenPerfilInstagram(req,res){

    console.log(req.params.accesstoken)
    https.get('https://api.instagram.com/v1/users/self?access_token='.concat(req.params.accesstoken), res2 => {
        res2.setEncoding("utf8");
        let body = "";
        res2.on("data", data => {
          body += data;
        });
        res2.on("end", () => {
          var resultado = JSON.parse(body);
          return res.status(200).send(resultado)
          console.log("devuelvo esto",resultado)
        });
      });

}


module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    saveUser,
    signIn,
    signUp,
    getUserByUsername,
    saveInstagram,
    showInstagram,
    devolverInstagramJson,
    obtenerImagenPerfilInstagram,
    updateUserAvatar
}