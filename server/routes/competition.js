const express = require('express')
const { Player } = require('../../src/models/Player')
const router = express.Router()
const { Util } = require('../../src/components/Util/commonUtil')


router.post('/competition', async (req, res)=>{
  try{
    const legendPlayer = await Player.findOne({pName: req.body.legendPlayerName}).exec()
    const commonPlayer = await Player.findOne({pName: req.body.commonPlayerName}).exec()

    if(!commonPlayer) res.status(200).json({resultMsg: "no_Player"})

    const result = Util.compareAndFight(legendPlayer, commonPlayer)

    if(!result) throw(err)
    if(result.legend > result.common) res.status(200).json({resultMsg: 'legend_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo})
    else if(result.legend < result.common) res.status(200).json({resultMsg: 'common_win', legendScore: result.legend, commonScore: result.common, fightInfo: result.fightInfo})

  }catch(err){
    if(err) console.log('err---->', err)
  }
})

module.exports = router
