const express = require('express')
const router = express.Router()
const { User } = require('../../src/models/User')

router.post('/logIn', (req, res) => {
  try {
   User.findOne({id: req.body.id},(err, user)=>{
     if(err) throw err;
     if(!user){
      return res.json({resultMsg: "notFoundID"})
     }
   })

    User.find((err,users)=>{
      users.forEach(ele => {
        if(ele.id == req.body.id){
          if(ele.pw == req.body.pw){
           return res.json({resultMsg: "logIn_success"})
          }else{
            return res.json({resultMsg: "notFoundPw"})
          }
        }
      });
    })
  } catch (e) {
    console.log('err---> ', e)
  }
})

module.exports = router
