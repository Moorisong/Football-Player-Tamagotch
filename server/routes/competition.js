const express = require('express')
const { Player } = require('../../src/models/Player')
const router = express.Router()
const { Util } = require('../../src/Util/commonUtil')
const { LatestRecord } = require('../../src/models/LatestRecord')
const { Legend } = require('../../src/models/Legend')
const { Training } = require('../../src/models/Training')

router.post('/competition', async (req, res)=>{
  try{
    let legendPlayer = await Player.findOne({pName: req.body.legendPlayerName}).exec()
    let commonPlayer = await Player.findOne({pName: req.body.commonPlayerName}).exec()

    let legendRecord = await LatestRecord.findOne({pName: req.body.legendPlayerName}).exec()
    let commonRecord = await LatestRecord.findOne({pName: req.body.commonPlayerName}).exec()

    let cPlayerTinfo = await Training.findOne({pName: req.body.commonPlayerName})

    if(!commonPlayer) return res.status(200).json({resultMsg: "no_Player"})
    if(!cPlayerTinfo) return res.status(200).json({resultMsg: "need_Train"})
    if(legendPlayer.competition.onFight) return res.status(200).json({resultMsg: "already_on_fight"})

    legendPlayer.competition.onFight = true
    await legendPlayer.save()

    const injury = await Util.occurInjury(commonPlayer, cPlayerTinfo, false)

    if(injury.result){
      legendPlayer.competition.onFight = false
      commonPlayer.competition.onFight = false
      await legendPlayer.save()
      await commonPlayer.save()
      return res.status(200).json({resultMsg: 'common_injury', minusValue: injury.minusValue, minusStat: injury.minusStat})
    }

    const result = Util.compareAndFight(legendPlayer, commonPlayer)

    if(!result) throw(err)

    if(result.legend > result.common){

      //개선 필요 #27
      if(legendRecord.record.length >= 7){
        legRecArr = legendRecord.record
        legRecArr.slice(1, legRecArr.length+1)
      }
      if(commonRecord.record.length >= 7){
        commRecArr = commonRecord.record
        commRecArr.slice(1, commRecArr.length+1)
      }

      legendRecord.record.push(true)
      await legendRecord.save()
      commonRecord.record.push(false)
      await commonRecord.save()

      let legendInfo = await Legend.findOne({pName: req.body.legendPlayerName}).exec()
      legendInfo.accWin += 1
      legendInfo.save()

      res.status(200).json({resultMsg: 'legend_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo, accWin: legendInfo.accWin})

      legendPlayer.competition.onFight = false

      return legendPlayer.save()
    }
    if(result.legend < result.common) {

      //개선 필요 #27
      if(legendRecord.record.length == 7){
        legRecArr = legendRecord.record
        legRecArr.slice(1, legRecArr.length+1)
      }
      if(commonRecord.record.length == 7){
        commRecArr = commonRecord.record
        commRecArr.slice(1, commRecArr.length+1)
      }

      legendRecord.record.push(false)
      legendRecord.save()

      commonRecord.record.push(true)
      commonRecord.save()

      const prevLegend = await Legend.findOne().sort({ _id: -1 }).exec()
      prevLegend.time_lastLost = new Date()
      prevLegend.save()

      let currLegend = await new Legend({pName: req.body.commonPlayerName})
      currLegend.turnNum = prevLegend.turnNum + 1
      currLegend.accWin += 1

      await currLegend.save()

      res.status(200).json({resultMsg: 'common_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo, turnNum: currLegend.turnNum})

      legendPlayer.competition.onFight = false

      return legendPlayer.save()
    }

  }catch(err){
    if(err) console.log('err---->', err)
    return res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
