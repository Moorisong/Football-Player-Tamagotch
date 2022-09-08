const express = require('express')
const { Player } = require('../../src/models/Player')
const router = express.Router()
const { Util } = require('../../src/components/Util/commonUtil')
const { LatestRecord } = require('../../src/models/LatestRecord')


router.post('/competition', async (req, res)=>{
  try{
    const legendPlayer = await Player.findOne({pName: req.body.legendPlayerName}).exec()
    const commonPlayer = await Player.findOne({pName: req.body.commonPlayerName}).exec()

    const legendRecord = await LatestRecord.findOne({pName: req.body.legendPlayerName}).exec()
    const commonRecord = await LatestRecord.findOne({pName: req.body.commonPlayerName}).exec()

    if(!commonPlayer) res.status(200).json({resultMsg: "no_Player"})

    const result = Util.compareAndFight(legendPlayer, commonPlayer)

    if(!result) throw(err)

    if(result.legend > result.common){

      if(legendRecord.record.length == 7) legendRecord.record = []
      if(commonRecord.record.length == 7) commonRecord.record = []

      legendRecord.record.push(true)
      legendRecord.save()
      commonRecord.record.push(false)
      commonRecord.save()

      res.status(200).json({resultMsg: 'legend_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo})
    }
    if(result.legend < result.common) {

      if(legendRecord.record.length == 7) legendRecord.record = []
      if(commonRecord.record.length == 7) commonRecord.record = []

      legendRecord.record.push(false)
      legendRecord.save()
      commonRecord.record.push(true)
      commonRecord.save()

      res.status(200).json({resultMsg: 'common_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo})
    }

  }catch(err){
    if(err) console.log('err---->', err)
  }
})

module.exports = router
