//imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const ejs = require('ejs');
const csurf = require('csurf')


// app set up
const app = express()
const csurfProtection = csurf();

// models
const Service = require('./models/services.model')
const User = require('./models/user.model')

//routes imports
const sequelize = require('./utilities/database.utils')
const UserModel = require('./models/user.model')
const config = require('./utilities/config.utils')
const userRoutes = require('./routes/user.route')
const servicesRoutes = require('./routes/services.route')

//set up and configurations
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: "keyboard cat",
        store: new SequelizeStore({
            db: sequelize,
        }),
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
    })
);
app.use((req, res, next) => {
    csurfProtection(req, res, next)
})
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    res.locals.user = req.session.user
    next()
});

//routes
app.use(userRoutes)
app.use(servicesRoutes)

// association
Service.belongsToMany(User, {
    through: "user_services"
})

User.belongsToMany(Service, {
    through: "user_services"
})

//listen to server
sequelize.sync({
        force: true
    })
    .then(() => {
        return UserModel.findOne({
            where: {
                email: "admin@booking.com"
            }
        })
    })
    .then(user => {
        if (user) {
            return
        }
        const admin = new UserModel({
            name: "admin",
            email: "admin@booking.com",
            password: "123",
            roleId: config.roleId.ROLE_ADMIN
        })

        return admin.save()
    })
    .then(() => {
        app.listen(5000, () => {
            console.log("app has started")
        })
    })
    .catch(error => {
        console.log(error)
    })