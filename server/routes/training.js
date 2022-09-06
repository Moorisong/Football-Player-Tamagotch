const express = require('express')
const { Player } = require('../../src/models/Player')
const router = express.Router()
const { Training } = require('../../src/models/Training')
const { User } = require('../../src/models/User')
const { Util } = require('../../src/components/Util/commonUtil')


router.post('/training', async (req, res) => {
  try{
    const findPlayer = await Player.findOne({pName: req.body.pName}).exec()

    if(findPlayer){
      if(findPlayer.training.onTrain == false) {
        findPlayer.training.onTrain = true
        findPlayer.training.trainType = req.body.trainType
        findPlayer.training.startTime = new Date();

        await findPlayer.save()

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

              setTimeout(()=>{
                const trainInfo = Util.afterTraining(findPlayer)
                console.log('전체 훈련 끝-----!!')
               return res.status(200).json({resultMsg: "entire_training_finished", plusValue: plusValue, plusStat: randomStat})
              }, 2000)
            } else{
              setTimeout(()=>{
                Util.afterTraining(findPlayer)
                console.log('전체 훈련 끝-----!!')
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

              setTimeout(()=>{
                Util.afterTraining(findPlayer)
                console.log('부분 훈련 끝-----!!')
               return res.status(200).json({resultMsg: "part_training_finished", plusValue: plusValue, plusStat: randomStat})
              }, 2000)
            } else{
              setTimeout(()=>{
                Util.afterTraining(findPlayer)
                console.log('부분 훈련 끝-----!!')
                return res.status(200).json({resultMsg: "part_training_finished", plusValue: 0, plusStat: null})
              }, 2000)
            }
          }
        }
      } else res.json({resultMsg: "already_on_Train", trainType: findPlayer.training.trainType, starTime: findPlayer.training.startTime})
    } else res.status(200).json({resultMsg: "no_Player"})

  }catch(err){
    console.log('err----> ', err)
  }
})

module.exports = router
