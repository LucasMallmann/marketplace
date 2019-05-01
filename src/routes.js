const express = require('express')
const routes = express.Router()
const validate = require('express-validation')
const handle = require('express-async-handler')

const controllers = require('./app/controllers')
const authMiddleware = require('./app/middlewares/auth')
const validators = require('./app/validators')

routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

// All routes below need authentication
routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 */
routes.post(
  '/purchase',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

routes.get('/purchase', handle(controllers.PurchaseController.index))

/**
 * Approve Ad
 */
routes.put('/purchase/:id', controllers.CheckoutController.update)

module.exports = routes
