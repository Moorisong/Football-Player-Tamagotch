const { NextPlan, ContactSupportOutlined } = require('@mui/icons-material')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')

router.post('/auth', (req, res) =>{

  try{
    const token = req.body.token

    if(req.body.msg=="token_state"){
      return res.status(403).json({token: token})
    }

    jwt.verify(token, 'secret-by-ksh', (err, decoded) => {
      if(err){
        return res.status(500).json({errorMsg: '토큰 복호화 과정에서 에러가 발생했습니다.'})
      }
      User.findOne({id: decoded.userId}, (err, user)=>{
        if(err){
          return res.status(403).json({resultMsg: "DB 검색 도중 오류가 발생했습니다."})
        }
        if(!user){
          return res.status(403).json({result: 'fail', resultMsg: "토큰에 해당하는 유저가 없습니다."})
        }
        if(user){
          req.token = token
          req.user = user

          return res.status(200).json({
            resultMsg: 'success',
            id: user.id,
            admin: req.user.role == 0 ? true : false ,
            nickName: user.nickName
          })
        }
      })
    })
  }catch(err){
    if(err) console.log(err)
    return res.status(500).json({errorCode: 'internal error'})
  }

})

module.exports = router
