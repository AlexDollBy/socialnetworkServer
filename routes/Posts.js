const express = require("express")
const posts = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const post= require("../models/Post")
posts.use(cors())
process.env.SECRET_KEY = 'secret'

posts.post('/creat',(req,res) => {
    const postData ={
        idGroup: req.body.idGroup,
        logo: req.body.logo,
        postText: req.body.postText,
        creator: req.body.creator
    }
    post.create(postData)
    .then(( ) => {
        res.send('postCreat')
    })
})
posts.post('/show',(req,res) => {
    post.findAll({
        where: {
            idGroup: req.body.idGroup
        }
    }).then(post => {
        res.send(post)
    })
    .catch(err => {
        res.send('error1: ' + err)
    })
})
module.exports = posts