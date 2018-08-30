'use strict'

const Link = require('../models/link.js')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')
const config = require('../config')
var jwt = require('jwt-simple');
const services = require('../services/')

function saveLink(req,res){
    //obtengo el id del usuario a partir del token
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;

    let link = new Link();
    link.name = req.body.name;
    link.url = req.body.url;
    link.active = req.body.active;
    link.user = idUsuario;
    link.type = req.body.type;

    if(req.body.type == 'twitter'){
        link.twitter.username = req.body.twitterUsername ,
        link.twitter.postslimit= req.body.twitterPostsLimit ;
    }

    if(req.body.type == 'instagram'){
        link.instagram.accesstoken = req.body.instagramAccessToken ,
        link.twitter.postslimit= req.body.twitterPostsLimit ;
    }

    if(req.body.type == 'facebook'){
        link.facebooktype = req.body.facebooktype 
    }

    if(req.body.type == 'youtube'){
        link.youtubetype = req.body.youtubetype 
    }

    link.save((err, linkStored)=>{
        if (err){
            res.status(500).send({message: `Error al guardar el link ${err}`})
        }

        res.status(200).send({link: linkStored})
    })
}

function getLink(req,res){
    let idLink = req.params.id;

    Link.findById(idLink,(err, link)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!link) return res.status(404).send({message: `El link no existe`})

        res.status(200).send({link})
    })
}

function getLinks(req,res){
    Link.find({}, (err, links)=>{
        if(err) return res.status(500).send({ message: `Error en la búsqueda ${err}`})
        if(!links) return res.status(404).send({message: `No existen links`})

        res.status(200).send({links})
    })
}

function updateLink(req,res){
    let idLink = req.params.id;
    let update = req.body

    Link.findByIdAndUpdate(idLink,update, (err, linkUpdated)=>{
        if(err) return res.status(500).send({ message: `Error en la actualización ${err}`})

        res.status(200).send({linkUpdated})
    })
}

function deleteLink(req,res){
    let idLink = req.params.id;
    
    Link.findById(idLink, (err, link)=>{
        if (err) res.send(500).send(`Error al borrar el link ${err}`)

        link.remove(err => {
            if (err) res.send(500).send(`Error al borrar el link ${err}`)
            res.status(200).send({message: "Link borrado correctamente"})
        })
    })
}

function getLinksUser(req,res){
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;

    console.log('busco',idUsuario)
    Link.find({user: idUsuario},(err,links)=>{
        if (err) res.send(500).send(`Links no encontrados ${err}`)
        res.status(200).send(links)
    });
}

function saveInstagram(req,res){
    //obtengo el id del usuario a partir del token
    var token = req.headers['authorization'].replace("Bearer ","");
    var decoded = jwt.decode(token, 'clavetokensocialcards');
    var idUsuario = decoded.sub;

    var parametro = req.params.accesstoken.replace("#access_token=","");
    var limite = req.params.postslimit;


    let link = new Link();
    link.active = true;
    link.user = idUsuario;
    link.type = 'instagram';

    link.instagram.accesstoken = parametro;
    link.instagram.postslimit = limite;
    
    link.save((err, linkStored)=>{
        if (err){
            res.status(500).send({message: `Error al guardar el link ${err}`})
        }

        res.status(200).send({link: linkStored})
    })
}


module.exports = {
    getLink,
    getLinks,
    updateLink,
    deleteLink,
    saveLink,
    getLinksUser,
    saveInstagram
}