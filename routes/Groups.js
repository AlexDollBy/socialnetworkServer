const express = require("express")
const groups = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const group = require("../models/Group")
groups.use(cors())
process.env.SECRET_KEY = 'secret'


groups.post("/creat", (req, res) => {
    const groupData = {
        name: req.body.name,
        description: req.body.description,
        creator: req.body.creator
    }

    group.findOne({
            where: {
                name: req.body.name
            }
        })
        .then(gr => {
            if (!gr) {
                group.create(groupData)
                    .then(gr => {
                        res.json({
                            status: `group named ${gr.name} creat`
                        })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.status(401).json({
                    error: 'Group already exists'
                })
            }
        })
        .catch(err => {
            res.send('error1: ' + err)
        })
})

groups.post("/update", (req, res) => {
    const groupData = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    }
    group.findOne({
        where: {
            name: groupData.name
        }
    }).then(gr => {
            group.update({
                    name: groupData.name!==''?groupData.name:gr.name,
                    description: groupData.description!==''?groupData.description:gr.description
                }, {
                    where: {
                        id: groupData.id
                    }
                })
                .then(() =>
                    res.send('okey')
                )
                .catch(err =>
                    res.send(err)
                )
        
    })
})

groups.post('/mygroups', (req, res) => {
    group.findAll({
            where: {
                creator: req.body.creator
            }
        }).then(grs => {
            if (grs) {
                res.send(grs)
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
})

groups.post('/openGroup', (req, res) => {
    group.findOne ({
            where: {
                id: req.body.id
            }
        }).then(gr => {
            if (gr) {
                res.send(gr)
            }else {
                res.status(400).send('Empty')
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
})

groups.post('/subscriptions', (req, res) => {
    group.findAll ({
            where: {
                id: req.body.id
            }
        }).then(gr => {
            if (gr) {
                res.send(gr)
            }else {
                res.status(400).send('Empty')
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
})


/*
users.post("/search", (req, res, next) => {
    User.findAll({
            where: {
                [Op.or]: [{
                        name: {
                            [Op.like]: [`${req.body.searchus}%`]
                        }
                    },
                    {
                        email: {
                            [Op.like]: [`${req.body.searchus}%`]
                        }
                    },
                    {
                        username: {
                            [Op.like]: [`${req.body.searchus}%`]
                        }
                    }
                ]
                /*
                name: {  [Op.like]: `${req.body.name}%` 
                   
                } 
            }
        }).then(userall => {
            res.send(userall)
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
        

})
*/
module.exports = groups