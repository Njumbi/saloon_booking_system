const express = require('express');
const routes = express();

const serviceController = require('../controllers/services.controller')

routes.get('/services', serviceController.getServicesPage)

routes.get('/services/data', serviceController.getServicesData)

routes.post('/services/add', serviceController.postAddServices)


module.exports = routes