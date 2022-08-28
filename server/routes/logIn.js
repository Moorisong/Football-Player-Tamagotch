const express = require('express')
const router = express.Router()
const { User } = require('../../src/models/User')

router.post('/logIn', async (req, res) => {
  try {
    const idFind = await User.findOne({ id: req.body.id }).exec()
    if (!idFind) {
      return res.json({ resultMsg: 'notFoundID' })
    }

    const pwMatch = await User.findOne({ pw: req.body.pw }).exec()
    if (!pwMatch) {
      return res.json({ resultMsg: 'notFoundPw' })
    }

    res.json({ resultMsg: 'logIn_success' })
    
  } catch (e) {
    console.log('err---> ', e)
  }
})

module.exports = router
