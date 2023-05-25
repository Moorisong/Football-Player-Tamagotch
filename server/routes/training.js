const express = require('express')
const { Player } = require('../models/Player')
const router = express.Router()
const { Training } = require('../models/Training')
const { Util } = require('../Util/commonUtil')

router.post('/training', async (req, res) => {
  try {
    let findPlayer = await Player.findOne({ pName: req.body.pName }).exec()
    let trainingInfo = await Training.findOne({ pName: req.body.pName }).exec()
    const INCREASE_VALUE_ARR = [1, 2, 1, 2, 5];
    const POSITION_ARR = ['defender', 'middle', 'attack', 'goalKeep'];

    Training.findOne({ pName: 'SH.Kim' }, (err, doc) => {
      if (!doc) {
        Training.create({ pName: 'SH.Kim' })

        Player.create({
          pName: 'SH.Kim',
          backNumber: 19,
          position: '수비수',
          stat: {
            common: {
              height: 175,
              weight: 78,
              foot: 'both',
            },
            defender: {
              defense: 40,
              mark: 54,
              endurance: 57,
            },
            middle: {
              pass: 57,
              sight: 40,
              ballKeep: 53,
            },
            attack: {
              accelerate: 60,
              scoreAbility: 46,
              shooting: 54,
            },
            goalKeep: {
              block: 9,
              throwBall: 46,
              communication: 33,
            },
          },
          country: 'South Korea',
          age: 34,
        })
      }
    })

    //선수 생성 후 첫번째 훈련에서는 부상을 당할 수 없도록
    findPlayer.training.onTrain = true

    let injury = await Util.occurInjury(
      findPlayer,
      trainingInfo,
      req.body.trainType
    )

    if (!trainingInfo) injury.result = false

    //부상 발생 시
    if (injury.result) {
       return setTimeout(() => {
        res.status(200).json({
          resultMsg: 'common_injury',
          minusValue: injury.minusValue,
          minusStat: injury.minusStat,
        })
      }, 1000)
    }

    let resultInfo = {
      plusValue: null,
      plusStat: null,
    }

    const randomPosition = Util.randomOfArray(POSITION_ARR)
    const getPlusValue = () => {
      const pickNumber = Util.makeRandomNumber(100, 1)
      if(findPlayer.training.trainType == 'entire'){
        return pickNumber <= 50 ? Util.randomOfArray(INCREASE_VALUE_ARR) : 0
      } else {
        return pickNumber <= 50 ? 1 : 0
      }
    }

    //부상 당하지 않음
    if (!injury) {
      if (!findPlayer) return res.status(200).json({ resultMsg: 'no_Player' })

      if (!trainingInfo) {
        trainingInfo = new Training({ pName: findPlayer.pName })
      }

      findPlayer.training.onTrain = true
      findPlayer.training.trainType = req.body.trainType
      findPlayer.training.startTime = new Date()
      findPlayer.save()

      if (findPlayer.training.onTrain) {
        //여기서 랜덤 확률로 스탯 UP
        //전체 훈련일 때
        const plusValue = getPlusValue()
        const randomStat = plusValue == 0 ? null : Util.randomOfArray(
          Object.keys(findPlayer.stat[randomPosition])
        )

        findPlayer.stat[randomPosition][randomStat] += plusValue

        resultInfo.plusValue = plusValue
        resultInfo.plusStat = randomStat

        setTimeout(() => {
          Util.afterTraining(
            findPlayer,
            trainingInfo,
            req.body.trainType,
            resultInfo
          )

          findPlayer.training.onTrain = false
          findPlayer.training.trainType = null
          findPlayer.training.startTime = null
          findPlayer.save()

          return res.status(200).json({
            resultMsg: req.body.trainType + '_training_finished',
            plusValue: plusValue,
            plusStat: randomStat,
          })
        }, 1000)
      }
    }
  } catch (err) {
    console.log('err----> ', err)
    res.status(500).json({ errorCode: 'internal error' })
  }
})

module.exports = router
