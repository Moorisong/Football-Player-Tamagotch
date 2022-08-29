const express = require('express')
const router = express.Router()
const { User } = require('../../src/models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/logIn', (req, res) => {
  try{
    User.findOne({id: req.body.id}, async(err, user)=>{
    if(err) {
      throw err;
      return res.status(500).json({msg: 'eroor occured'})
    }
    if(!user){
      return res.status(403).json({resultMsg: 'notFoundID'})
    }
    if(user){
      await bcrypt.compare(req.body.pw, user.pw, (err, isMatch)=>{
        if(err) {
          throw err;
          return res.status(500).json({msg: 'Somgthing is wrong'})
        }
        if(isMatch){
          const token = jwt.sign({userId: user.id},'secret-by-ksh', {expiresIn: "7d"})
          user.token = token;
          user.save((err,user)=>{
            if(err){
              throw err;
              res.status(400).json({msg: 'error occured'})
            }
            return res
            .status(200)
            .json({resultMsg: 'logIn_success', userId: user.id, token: token});
          })
        }else{
          return res.status(403).json({resultMsg: 'notFoundPw'})
        }
      })
    }
  })
}catch{
  console.log("err ===> ", err);
  }
})

module.exports = router
