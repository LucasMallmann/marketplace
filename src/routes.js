const express = require('express')
const routes = express.Router()

// Controllers
const UserController = require('./app/controllers/UserController')

routes.post('/users', UserController.store)

module.exports = routes
