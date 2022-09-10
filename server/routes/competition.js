const express = require('express')
const { Player } = require('../../src/models/Player')
const router = express.Router()
const { Util } = require('../../src/components/Util/commonUtil')
const { LatestRecord } = require('../../src/models/LatestRecord')
const { Legend } = require('../../src/models/Legend')
const { Training } = require('../../src/models/Training')


router.post('/competition', async (req, res)=>{
  try{
    const legendPlayer = await Player.findOne({pName: req.body.legendPlayerName}).exec()
    const commonPlayer = await Player.findOne({pName: req.body.commonPlayerName}).exec()

    const legendRecord = await LatestRecord.findOne({pName: req.body.legendPlayerName}).exec()
    const commonRecord = await LatestRecord.findOne({pName: req.body.commonPlayerName}).exec()

    const cPlayerTinfo = await Training.findOne({pName: req.body.commonPlayerName})

    if(!commonPlayer) res.status(200).json({resultMsg: "no_Player"})

    const injury = Util.occurInjury(commonPlayer, cPlayerTinfo)
    return injury ? res.status(200).json({resultMsg: 'common_injury'}) : res.status(500).json({resultMsg: 'internal error'})

    const result = Util.compareAndFight(legendPlayer, commonPlayer)

    if(!result) throw(err)

    if(result.legend > result.common){

      if(legendRecord.record.length == 7) legendRecord.record = []
      if(commonRecord.record.length == 7) commonRecord.record = []

      legendRecord.record.push(true)
      legendRecord.save()
      commonRecord.record.push(false)
      commonRecord.save()

      let legendInfo = await Legend.findOne({pName: req.body.legendPlayerName}).exec()
      legendInfo.accWin += 1
      legendInfo.save()

      res.status(200).json({resultMsg: 'legend_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo, accWin: legendInfo.accWin})
    }
    if(result.legend < result.common) {

      if(legendRecord.record.length == 7) legendRecord.record = []
      if(commonRecord.record.length == 7) commonRecord.record = []

      legendRecord.record.push(false)
      legendRecord.save()
      commonRecord.record.push(true)
      commonRecord.save()

      const prevLegend = await Legend.findOne({pName: req.body.legendPlayerName}).exec()
      prevLegend.time_lastLost = new Date()
      prevLegend.save()

      let currLegend = await new Legend({pName: req.body.commonPlayerName})
      currLegend.turnNum = prevLegend.turnNum + 1
      currLegend.accWin += 1
      currLegend.save()

      res.status(200).json({resultMsg: 'common_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo, turnNum: currLegend.turnNum})
    }

  }catch(err){
    if(err) console.log('err---->', err)
    return res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
