const express = require('express')
const router = express.Router()
const { FriendshipInfo } = require('../../src/models/FriendshipInfo')
const { Util } = require('../../src/components/Util/commonUtil')
const { LatestRecord } = require('../../src/models/LatestRecord')

router.post('/giveKiss', async (req, res) => {
  try {
    const fsTarget = await FriendshipInfo.findOne({
      pName: req.body.pName,
    }).exec()
    const recordInfo = await LatestRecord.findOne({
      pName: req.body.pName,
    }).exec()

    if (!fsTarget) return res.status(200).json({ resultMsg: 'no_Player' })
    if (!recordInfo) return res.status(200).json({ resultMsg: 'no_recordInfo' })

    let luckyNum = Util.makeRandomNumber(100, 1)
    const recordArr = recordInfo.record
    const winCnt = recordArr.filter(ele => ele == true).length

    if (recordArr.length <= 3 && winCnt >= 1) {
      luckyNum += 10
      if (luckyNum < 50) {
        fsTarget.friendship += 1
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'plusOne', mood: 1 })
      }
      if (luckyNum > 60) {
        fsTarget.friendship += 2
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'plusTwo', mood: 2 })
      }
    } else if (recordArr.length >= 5 && winCnt >= 2) {
      luckyNum += 20
      if (luckyNum < 60) {
        fsTarget.friendship += 1
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'plusOne', mood: 3 })
      }
      if (luckyNum > 80) {
        fsTarget.friendship += 2
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'plusTwo', mood: 4 })
      }
    }

    if (recordArr.length >= 5 && winCnt <= 2) {
      luckyNum -= 10
      if (luckyNum < 20) {
        fsTarget.friendship -= 1
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'minusOne', mood: -1 })
      }
      if (luckyNum < 5) {
        fsTarget.friendship -= 2
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'minusTwo', mood: -2 })
      }
      if (luckyNum >= 80) {
        // 전적이 좋지 않아 기분은 나쁘지만 럭키 넘버가 높은 경우
        fsTarget.friendship += 1
        await fsTarget.save()
        return res.status(200).json({ resultMsg: 'plusOne', mood: -3 })
      } else {
        return res.status(200).json({ resultMsg: 'noChange', mood: -4 })
      }
    }

    res.status(200).json({ resultMsg: 'noChange', mood: 0 })

    if (fsTarget.friendship < 0) {
      fsTarget.friendship = 0
      await fsTarget.save()
    }
  } catch (err) {
    if (err) console.log('err---->', err)
    return res.status(500).json({ resultMsg: 'internal error' })
  }
})
module.exports = router
