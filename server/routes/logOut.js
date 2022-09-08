const express = require('express')
const router = express.Router()

router.post('/logOut', (req, res) => {
  try{
    res.clearCookie('_id')
    return res.status(200).json({resultMsg: "logOut_success"})
  }catch(err){
    console.log("err---> ", err);
    return res.status(500).json({resultMsg: 'internal error'})
    }
  })

module.exports = router
