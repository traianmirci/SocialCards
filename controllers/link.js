'use strict'

const Link = require('../models/link.js')

function saveLink(req,res){

    let link = new Link();
    link.name = req.body.name;
    link.url = req.body.url;
    link.clicks = req.body.clicks;
    link.active = req.body.active;

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

module.exports = {
    getLink,
    getLinks,
    updateLink,
    deleteLink,
    saveLink
}