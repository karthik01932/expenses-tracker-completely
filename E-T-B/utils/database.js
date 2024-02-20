const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'root', 'K8321@art#',{
    dialect : 'mysql',
    host: 'localhost'
});

module.exports = sequelize;