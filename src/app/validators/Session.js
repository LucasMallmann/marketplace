const Joi = require('joi')

module.exports = {
  body: {
    email: Joi.string().email(),
    password: Joi.string().required()
  }
}
