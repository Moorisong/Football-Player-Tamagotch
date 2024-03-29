const express = require('express')
const router = express.Router()
const { User } = require('../../src/models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/logIn', (req, res) => {
  try {
    User.findOne({ id: req.body.id }, async (err, user) => {
      if (err) {
        throw err
      }
      if (!user) {
        return res.status(403).json({ resultMsg: 'notFoundID' })
      }
      if (user) {
        await bcrypt.compare(req.body.pw, user.pw, (err, isMatch) => {
          if (err) {
            throw err
          }
          if (isMatch) {
            const token = jwt.sign({ userId: user.id }, 'secret-by-ksh', {
              expiresIn: '1d',
            })
            user.token = token
            user.save((err, user) => {
              if (err) {
                throw err
              }
              return res
                .status(200)
                .json({
                  resultMsg: 'logIn_success',
                  rs:{
                    userId: user.id,
                    token: token,
                  }
                })
            })
          } else {
            return res.status(403).json({ resultMsg: 'notFoundPw' })
          }
        })
      }
    })
  } catch {
    console.log('err---> ', err)
    return res.status(500).json({ resultMsg: 'internal error' })
  }
})

module.exports = router
