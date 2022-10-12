const MainAuthRouter = require("express").Router()

MainAuthRouter.route('/login')
    .get(require('./login.view.js'))

MainAuthRouter.route('/register')
    .get(require('./register.view.js'))

module.exports = MainAuthRouter