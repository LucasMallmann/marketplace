const express = require('express')
const routes = express.Router()

// Controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

// Middlewares
const authMiddleware = require('./app/middlewares/auth')

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

// test
routes.get('/test', authMiddleware, (req, res) => {
  return res.status(200).json('okay')
})

module.exports = routes
