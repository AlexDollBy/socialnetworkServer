const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post("/register", (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({
                                status: user.username + ' registered'
                            })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.status(401).json({
                    error: 'User already exists'
                })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post("/update",(req,res)=>{
    User.update(
        { 
          email: req.body.email,
          name: req.body.name
        },
        { where: { id: req.body.id } }
      )
    .then(() =>
        User.findOne({
            where: {
                id: req.body.id
            }
        })
            .then(user => {
                if (user) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    )
    .catch(err =>
        res.send(err)
    )
})

users.post("/login", (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    console.log(user.dataValues);
                    res.send(token)
                }

            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

users.post("/search",(req,res,next)=>{
    User.findAll({
        where: {
            [Op.or]:[
                {name: {[Op.like]: [`${req.body.searchus}%`]}},
                {email: {[Op.like]: [`${req.body.searchus}%`]}},
                {username: {[Op.like]: [`${req.body.searchus}%`]}}
            ]
            /*
            name: {  [Op.like]: `${req.body.name}%` 
               
            } */
        }
    }).then(userall=>{
        res.send(userall)
    })
    .catch(err => {
        res.status(400).json({ error: err })
    })

})

users.post("/getById",(req,res)=>{
    User.findOne({
        where: {
            id: req.body.idUser
        }
    }).then(user=>{
        res.send(user.name)
    })
    .catch(err => {
        res.status(400).json({ error: err })
    })

})

module.exports = users