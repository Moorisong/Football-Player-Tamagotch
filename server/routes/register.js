const express = require('express')
const router = express.Router()
const { User } = require('../../src/models/User')

router.post('/register', (req, res) => {
  try {
    let user = new User(req.body)
    User.find((err,users)=>{
      users.forEach(ele => {
        if(ele.id == req.body.id){
          console.log('이미 존재하는 ID입니다.');
          res.json({resultMsg: 'duplicated ID'})
        }
      });
    })
    user.save().then(() => {
      console.log(`[${user.id}] 님의 정보가 추가되었습니다.`)
      res.json({ resultMsg: 'success' })
    })
  } catch (e) {
    console.log('err---> ', e)
  }
})

module.exports = router
