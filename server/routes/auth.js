const { NextPlan } = require('@mui/icons-material')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../../src/models/User')


// const jwtMiddleWare = (err, req, res, next)=> {

//   const token = req.body.token

//   jwt.verify(token, 'secret-by-ksh', (err, decoded) => {
//     if(err){
//       return res.status(500).json({err: '토큰 복호화 과정에서 에러가 발생했습니다.'})
//     }
//     User.findOne({id: decoded.userId}, (err, user)=>{
//       if(err){
//         return res.status(403).json({err: "DB 검색 도중 오류가 발생했습니다."})
//       }
//       if(!user){
//         return res.status(403).json({result: 'fail', err: "토큰에 해당하는 유저가 없습니다."})
//       }
//       if(user){
//         req.token = token
//         req.user = user
//       }
//       next()
//     })
//   })
// }

router.post('/auth', (req, res) =>{

  const token = req.body.token

  jwt.verify(token, 'secret-by-ksh', (err, decoded) => {
    if(err){
      return res.status(500).json({err: '토큰 복호화 과정에서 에러가 발생했습니다.'})
    }
    User.findOne({id: decoded.userId}, (err, user)=>{
      if(err){
        return res.status(403).json({err: "DB 검색 도중 오류가 발생했습니다."})
      }
      if(!user){
        return res.status(403).json({result: 'fail', err: "토큰에 해당하는 유저가 없습니다."})
      }
      if(user){
        req.token = token
        req.user = user

        return res.status(200).json({
          result: 'success',
          admin: req.user.role == 0 ? true : false ,
        })
      }
    })
  })
})

module.exports = router
