const { LegendToggleRounded } = require('@mui/icons-material')
const express = require('express')
const router = express.Router()
const { Player } = require('../../src/models/Player')

router.post('/makeNewPlayer', async (req, res)=>{
  try{
    const playerNameFind = await Player.findOne({name: req.body.name}).exec()
    if(playerNameFind) return res.status(403).json({resultMsg: 'duplicated player name'})

    let player = new Player(req.body)

    function randomOfArray(array, max){
        const maxRandomVal = Math.floor(Math.random() * array.length)
        return array[maxRandomVal];
    }

    function makeRandomNumber(max=null, min=null){
      //min 값은 1부터 가능함
      if(max && !min){
        const maxRandomVal = Math.random() * posList.length
        return Math.floor(maxRandomVal)
      }else if(max && min){
        const bothRandomVal = (Math.random()*(max-min))+min
        return Math.floor(bothRandomVal)
      }
    }

    const country = ['대한민국','일본','중국','미국','스페인','잉글랜드','멕시코','나이지리아','터키','벨기에','프랑스','남아프리카공화국','독일','싱가포르','호주','뉴질랜드','케냐','가나','네팔','오스트리아','체코','페루','아르헨티나','브라질','포르투갈','러시아','우크라이나','스코틀랜드','아일랜드','아이슬란드'];
    const foot = ['왼발','오른발','양발']

    player.name = req.body.name
    player.country = randomOfArray(country, country.length, null)
    player.age = makeRandomNumber(40, 18)
    player.backNumber = req.body.backNumber
    player.position = req.body.position

    player.stat.common.height = player.position == '수비수' ? makeRandomNumber(205, 175) : makeRandomNumber(205, 160)
    player.stat.common.weight = player.height >=180 ? makeRandomNumber(90, 75) : makeRandomNumber(88, 73)
    player.stat.common.foot = randomOfArray(foot, foot.length)

    player.stat.defender.defense = player.position == '수비수' ? makeRandomNumber(100, 60) : makeRandomNumber(65, 1)
    player.stat.defender.mark = player.position == '수비수' ? makeRandomNumber(100, 40) : makeRandomNumber(65, 1)
    player.stat.defender.endurance = player.position == '수비수' ? makeRandomNumber(100, 40) : makeRandomNumber(65, 1)

    player.stat.middle.pass = player.position == '미드필더' ? makeRandomNumber(100, 60) : makeRandomNumber(90, 1)
    player.stat.middle.sight = player.position == '미드필더' ? makeRandomNumber(100, 40) : makeRandomNumber(65, 1)
    player.stat.middle.ballKeep = player.position == '미드필더' ? makeRandomNumber(100, 40) : makeRandomNumber(100, 1)


    player.stat.attack.accelerate = player.position == '공격수' ? makeRandomNumber(100, 40) : makeRandomNumber(70, 1)
    player.stat.attack.scoreAbility = player.position == '공격수' ? makeRandomNumber(100, 60) : makeRandomNumber(70, 1)
    player.stat.attack.shooting = player.position == '공격수' ? makeRandomNumber(100, 40) : makeRandomNumber(75, 1)


    player.stat.goalKeep.block = player.position == '골키퍼' ? (100, 60) : makeRandomNumber(30, 1)
    player.stat.goalKeep.throwBall = player.position == '골키퍼' ? makeRandomNumber(100, 50) : makeRandomNumber(50, 1)
    player.stat.goalKeep.communication = player.position == '골키퍼' ? makeRandomNumber(100, 60) : makeRandomNumber(65, 1)

    console.log('player Info--->', player)

    player.save();
    res.status(200).json({resultMsg: 'succees'})

  }catch(err){
    if(err) console.log('err--->', err)
  }
})

module.exports = router
