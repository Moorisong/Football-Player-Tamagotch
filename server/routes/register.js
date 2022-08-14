const express = require('express')
const router = express.Router()
const { User } = require('../../src/models/User')

router.post('/register', (req, res) => {
  try {
    let user = new User(req.body)
    user.save().then(() => {
      console.log(`[${user.id}] 님의 정보가 추가되었습니다.`)
      res.json({ resultMsg: 'success' })
    })
  } catch (e) {
    console.log('error---> ', e)
  }
})

module.exports = router
