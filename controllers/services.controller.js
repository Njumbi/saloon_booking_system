const Service = require('../models/services.model')

exports.getServicesPage = (req, res, next) => {
    res.render('services', {
        path: "services"
    })
}
exports.getServicesData = (req, res, next) => {
    Service.findAll()
        .then(data => {
            res.status(200).json({
                draw: req.body.draw,
                recordsTotal: data.length,
                data: data
            })
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                status: false,
                message: error.message
            })
        })
}

exports.postAddServices = (req, res, next) => {
    const service = req.body.services
    console.log('....is it here')
    console.log(req.body.services)
    Service.findOne({
            where: {
                service: service
            }
        })
        .then(servise => {
            if (servise) {
                console.log('....did you find')
                res.status(200).json({
                    status: false,
                    message: "service already exists"
                })
            } else {
                newService = new Service({
                    service: service,
                })
                newService.save()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: "service successfully saved"
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(200).json({
                            status: false,
                            message: error.message
                        })
                    })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                status: false,
                message: error.message
            })
        })
}