const Sequelize = require('sequelize');

const sequelize = require('../utils/database.js');

const UserExpenses = sequelize.define('expenses',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    catergory: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = UserExpenses;