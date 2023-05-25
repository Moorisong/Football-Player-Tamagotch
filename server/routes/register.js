const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    const userFind = await User.findOne({ id: req.body.id }).exec()
    if (userFind) return res.status(403).json({ resultMsg: 'duplicated ID' })
    let user = new User(req.body)
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.pw, salt)

    user.pw = hash
    user.playerInfo.playerName = `no_${req.body.id}`

    await user.save()
    console.log(`[${user.id}] 님의 정보가 추가되었습니다.`)
    res.json({ resultMsg: 'success' })

  } catch (e) {
    console.log('err---> ', e)
    return res.status(500).json({errorCode: 'internal error'})
  }
})

module.exports = router
