const User = require('../models/user.model');

exports.getLoginPage = (req, res, next) => {
    res.render('login_user', {
        errorMessage: "",
        successMessage: ""
    })
}
exports.postLoginPage = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.pass;

    User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (user) {
                res.redirect('/')
            } else {
                res.render('login_user.ejs', {
                    errorMessage: "wrong credentials",
                    successMessage: ""
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.render('login_user', {
                errorMessage: error.message,
                successMessage: ""
            })
        })
}

exports.getUsersPage = (req, res, next) => {
    res.render('users', {
        path: "users"
    })
}

exports.getUsersData = (req, res, next) => {
    User.findAll()
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

exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (user) {
                res.status(200).json({
                    status: false,
                    message: "user with that email already exists"
                })
            } else {
                newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                    roleId: 2
                })
                newUser.save()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: "user saved"
                        })
                    })
                    .catch(error => {
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