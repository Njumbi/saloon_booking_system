const express = require('express');
const routes = express();

const userController = require('../controllers/user.controller')

routes.get('/login', userController.getLoginPage);

routes.post('/login', userController.postLoginPage)

routes.get('/users', userController.getUsersPage)

routes.get('/users/data', userController.getUsersData)

routes.post('/users/add', userController.postAddUser)

module.exports = routes;