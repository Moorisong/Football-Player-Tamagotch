const express = require('express')
const router = express.Router()

router.post('/logOut', (req, res) => {
  try{
    res.clearCookie('_id_damagotch_'+req.body.id)
    return res.status(200).json({resultMsg: "logOut_success"})
  }catch(err){
    console.log("err---> ", err);
    return res.status(500).json({errorCode: 'internal error'})
    }
  })

module.exports = router
