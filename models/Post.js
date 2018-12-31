const Sequelize = require('sequelize');
const db = require("../database/db.js");
module.exports = db.sequelize.define(
    "post", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idGroup:{
            type: Sequelize.INTEGER
        },
        logo: {
            type: Sequelize.STRING
        },
        postText: {
            type: Sequelize.STRING
        },
        creator: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    },
    
)