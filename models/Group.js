const Sequelize = require('sequelize');
const db = require("../database/db.js");
module.exports = db.sequelize.define(
    "group", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        subscribers: {
            type: Sequelize.STRING
        },
        creator: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    },
    
)