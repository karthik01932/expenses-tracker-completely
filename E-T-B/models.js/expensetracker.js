const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const  UserSign = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = UserSign;