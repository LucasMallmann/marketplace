const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')
const PurchaseMailJob = require('../jobs/PurchaseMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      user: user._id,
      ad,
      content
    })

    Queue.create(PurchaseMailJob.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.status(201).json(purchase)
  }

  async index (req, res) {
    const purchases = await Purchase.find().populate(['ad', 'user'])
    return res.status(200).json(purchases)
  }
}

module.exports = new PurchaseController()
