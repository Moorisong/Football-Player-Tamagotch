const express = require('express')
const { Legend } = require('../../src/models/Legend')
const { Player } = require('../../src/models/Player')
const router = express.Router()

router.post('/main', async (req, res)=>{
try{
  if(req.body.legendPlayer=='none'){
    req.body.legendPlayer = 'SH.Kim'
    const firstLegend = await new Legend({pName: req.body.legendPlayer})
    firstLegend.save()
  }

  let legend = await Legend.findOne().sort({ _id: -1 })

  console.log("leg---> ", legend)
  return res.status(200).json({result: 'success'})

}catch(err){
  if(err) console.log('err---> ', err)
  return res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
