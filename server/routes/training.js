const express = require('express')
const { Player } = require('../../src/models/Player')
const router = express.Router()
const { Training } = require('../../src/models/Training')
const { Util } = require('../../src/components/Util/commonUtil')


router.post('/training', async (req, res) => {
  try{
    let findPlayer = await Player.findOne({pName: req.body.pName}).exec()
    let trainingInfo = await Training.findOne({pName: req.body.pName}).exec()

    //선수 생성 후 첫번째 훈련에서는 부상을 당할 수 없도록
    findPlayer.training.onTrain = true
    const injury = await Util.occurInjury(findPlayer, trainingInfo, req.body.trainType)

    if(!trainingInfo) injury.result = false

    //부상 당함
    if(injury.result){

      return setTimeout(()=>{
      res.status(200).json({resultMsg: 'common_injury', minusValue: injury.minusValue, minusStat: injury.minusStat})
      },2000)
    }

  let resultInfo = {
    plusValue: null,
    plusStat: null
  }

  //부상 당하지 않음
  if(!injury){
    if(!findPlayer) return res.status(200).json({resultMsg: "no_Player"})

    if(!trainingInfo){
      trainingInfo = new Training({pName: findPlayer.pName})
    }

    findPlayer.training.onTrain = true
    findPlayer.training.trainType = req.body.trainType
    findPlayer.training.startTime = new Date();
    findPlayer.save()

    if(findPlayer.training.onTrain){
    //여기서 랜덤 확률로 스탯 UP
    //전체 훈련일 때
      if(findPlayer.training.trainType == 'entire'){
        const pickNumber = Util.makeRandomNumber(100,1)

      if(pickNumber<=20){
        const randomPosition = Util.randomOfArray(['defender', 'middle', 'attack', 'goalKeep'])
        const randomStat = Util.randomOfArray(Object.keys(findPlayer.stat[randomPosition]))
        const plusValue = Util.randomOfArray([1,2])

        findPlayer.stat[randomPosition][randomStat] += plusValue

        resultInfo.plusValue = plusValue
        resultInfo.plusStat = randomStat

        setTimeout(()=>{

          Util.afterTraining(findPlayer, trainingInfo, req.body.trainType, resultInfo)

          findPlayer.training.onTrain = false
          findPlayer.training.trainType = null
          findPlayer.training.startTime = null
          findPlayer.save()

          return res.status(200).json({resultMsg: "entire_training_finished", plusValue: plusValue, plusStat: randomStat})
        }, 2000)
      } else{
        resultInfo.plusValue = 0
        resultInfo.plusStat = null

        setTimeout(()=>{
          Util.afterTraining(findPlayer, trainingInfo, req.body.trainType, resultInfo)

          findPlayer.training.onTrain = false
          findPlayer.training.trainType = null
          findPlayer.training.startTime = null
          findPlayer.save()

          return res.status(200).json({resultMsg: "entire_training_finished", plusValue: 0, plusStat: null})
        }, 2000)
      }

    //부분 훈련일 때
    }else if(findPlayer.training.trainType == 'part'){
      const pickNumber = Util.makeRandomNumber(100,1)
      if(pickNumber<=40){
        const randomPosition = Util.randomOfArray(['defender', 'middle', 'attack', 'goalKeep'])
        const randomStat = Util.randomOfArray(Object.keys(findPlayer.stat[randomPosition]))
        const plusValue = 1

        findPlayer.stat[randomPosition][randomStat] += plusValue

        resultInfo.plusValue = plusValue
        resultInfo.plusStat = randomStat

        setTimeout(async ()=>{
          await Util.afterTraining(findPlayer, trainingInfo, req.body.trainType, resultInfo)
          return res.status(200).json({resultMsg: "part_training_finished", plusValue: plusValue, plusStat: randomStat})
        }, 2000)
      } else{
        setTimeout(async ()=>{
          resultInfo.plusValue = 0
          await Util.afterTraining(findPlayer, trainingInfo, req.body.trainType, resultInfo)
          return res.status(200).json({resultMsg: "part_training_finished", plusValue: 0, plusStat: null})
        }, 2000)
      }
    }
  }
}

  }catch(err){
    console.log('err----> ', err)
    res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
