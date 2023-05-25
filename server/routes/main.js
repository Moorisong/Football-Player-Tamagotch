const express = require('express')
const { Legend } = require('../models/Legend')
const { Player } = require('../models/Player')
const { User } = require('../models/User')
const { LatestRecord } = require('../models/LatestRecord')
const router = express.Router()

router.post('/main', async (req, res) => {
  try {
    Legend.findOne({ pName: 'SH.Kim' }, (err, doc) => {
      if (!doc) {
        Legend.create({ pName: 'SH.Kim' })
        LatestRecord.create({ pName: 'SH.Kim' })
      }
    })

    const user = await User.findOne({ id: req.body.id }).exec()

    if(!user.playerInfo.hasPlayer){
      return res.status(500).json({ errorCode: 'noPlayer' })

    }
    const playerName = user.playerInfo.playerName

    let legend = await Legend.findOne().sort({ pName: 1 }).exec()
    const player = await Player.findOne({pName: playerName}).exec()
    const posName = function(){
      switch(player.position){
        case '수비수':
          return 'defender'
          break

        case '미드필더':
          return 'middle'
          break

        case '공격수':
          return 'attack'
          break

        case '골키퍼':
          return 'goalKeep'
          break
      }
    }

    const latestRecord = await LatestRecord.findOne({pName: playerName}).exec()

    const rs = {
      userInfo: {
        id: req.body.id,
        pName: playerName
      },
      playerInfo: {
        pName: player.pName,
        bNum: player.backNumber,
        position: player.position,
        mainStat: player.stat[posName()],
        record: latestRecord.record,
      },
      currLegend: {
        legendName: legend.pName,
        turnNum: legend.turnNum,
        accWin: legend.accWin
      }
    }

    return res.status(200).json({ result: 'success', rs})
  } catch (err) {
    if (err) console.log('err---> ', err)
    return res.status(500).json({ errorCode: 'internal error' })
  }
})

module.exports = router
