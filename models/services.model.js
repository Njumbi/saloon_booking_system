const Sequelize = require('sequelize');

const sequelize = require('../utilities/database.utils');

const Service = sequelize.define('services', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    service: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
module.exports = Service;