const express = require('express')
const { Legend } = require('../../src/models/Legend')
const router = express.Router()

router.post('/registerLegend', async (req, res)=>{
  try{
    const prevLegend = await Legend.findOne({pName: req.body.oldLegendName}).exec()
    prevLegend.time_lastLost = new Date()
    prevLegend.save()

    let currLegend = await new Legend({pName: req.body.newLegendName})
    currLegend.turnNum = prevLegend.turnNum + 1
    currLegend.accWin += 1
    currLegend.save()

    res.status(200).json({resultMsg: "success", turnNum: currLegend.turnNum})

  }catch(err){
    if(err) console.log('err---> ', err)
    return res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
