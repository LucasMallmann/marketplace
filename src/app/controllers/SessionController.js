const User = require('../models/User')

class SessionController {
  /**
   * Realiza o login
   * @param {Function} req
   * @param {Function} res
   */
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.status(200).json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
