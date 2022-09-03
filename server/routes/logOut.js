const express = require('express')
const router = express.Router()




router.post('/logOut', (req, res) => {
  try{
    res.clearCookie('_id')
    console.log('cookie--->', req.cookies)
    return res.status(200).json({resultMsg: "logOut_success"})
  }catch(err){
    console.log("err ===> ", err);
    }
  })

module.exports = router
