const express = require('express')
const { Legend } = require('../../src/models/Legend')
const { Player } = require('../../src/models/Player')
const router = express.Router()

router.post('/main', async (req, res)=>{
try{
  if(!req.body.legendPlayer){
    req.body.legendPlayer = 'SH.Kim'
    const firstLegend = await Player.findOne({pName: req.body.legendPlayer}).exec()
    if(!firstLegend) return console.log('------Insert the first legend to the legend DB!!!!------')
  }

  let legend = await new Legend({pName: req.body.legendPlayer})
  legend.save()

  console.log("leg---> ", legend)

}catch(err){
  if(err) console.log('err---> ', err)
  return res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
