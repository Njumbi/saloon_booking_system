const Sequelize = require('sequelize');

const sequelize = new Sequelize('saloon', 'root', '0721942755', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;