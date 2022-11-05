const express = require('express')
const { Legend } = require('../../src/models/Legend')
const { Player } = require('../../src/models/Player')
const { User } = require('../../src/models/User')
const { LatestRecord } = require('../../src/models/LatestRecord')
const router = express.Router()

router.post('/main', async (req, res) => {
  try {
    Legend.findOne({ pName: 'SH.Kim' }, (err, doc) => {
      if (!doc) {
        Legend.create({ pName: 'SH.Kim' })
        LatestRecord.create({ pName: 'SH.Kim' })
      }
    })

    const user = await User.findOne({ id: req.body.id }).exec()
    let legend = await Legend.findOne().sort({ pName: -1 })

    console.log('Legend---11----> ', legend)

    return res.status(200).json({ result: 'success' })
  } catch (err) {
    if (err) console.log('err---> ', err)
    return res.status(500).json({ resultMsg: 'internal error' })
  }
})

module.exports = router
