const Purchase = require('../models/Purchase')
const mongoose = require('mongoose')
const isValidId = mongoose.Types.ObjectId.isValid

class CheckoutController {
  async update (req, res) {
    const { id } = req.params

    if (!isValidId(id)) {
      return res.status(400).json({ error: 'The Id provided is not valid' })
    }

    const { ad } = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ errpr: 'You are not the ad author' })
    }

    if (ad.purchasedBy) {
      return res.status(400).json({ error: 'This ad was already purchased' })
    }

    ad.purchasedBy = id

    await ad.save()
    return res.json(ad)
  }
}
module.exports = new CheckoutController()
