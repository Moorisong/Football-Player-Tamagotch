const  { Util } = require('../../src/components/Util/commonUtil')
const express = require('express')
const router = express.Router()
const { Player } = require('../../src/models/Player')
const { FriendshipInfo } = require('../../src/models/FriendshipInfo')
const { LatestRecord } = require('../../src/models/LatestRecord')
const { User } = require('../../src/models/User')

router.post('/makeNewPlayer', async (req, res)=>{
  try{
    let userInfo = await User.findOne({id: req.body.userId}).exec()
    if(userInfo.hasPlayer) return res.status(403).json({resultMsg: 'already has player'})

    const playerNameFind = await Player.findOne({pName: req.body.pName}).exec()
    if(playerNameFind) return res.status(403).json({resultMsg: 'duplicated player name'})

    let player = new Player(req.body)

    var country = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",,"Bermuda","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Tunisia","Turkey","Turkmenistan", "Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
    const foot = ['left','right','both']

    player.pName = req.body.pName
    player.country = Util.randomOfArray(country, country.length, null)
    player.age = Util.makeRandomNumber(40, 18)
    player.backNumber = req.body.backNumber
    player.position = req.body.position

    player.stat.common.height = player.position == '수비수' ? Util.makeRandomNumber(205, 175) : Util.makeRandomNumber(205, 160)
    player.stat.common.weight = player.height >=180 ? Util.makeRandomNumber(90, 75) : Util.makeRandomNumber(88, 73)
    player.stat.common.foot = Util.randomOfArray(foot, foot.length)

    player.stat.defender.defense = player.position == '수비수' ? Util.makeRandomNumber(100, 60) : Util.makeRandomNumber(65, 1)
    player.stat.defender.mark = player.position == '수비수' ? Util.makeRandomNumber(100, 40) : Util.makeRandomNumber(65, 1)
    player.stat.defender.endurance = player.position == '수비수' ? Util.makeRandomNumber(100, 40) : Util.makeRandomNumber(65, 1)

    player.stat.middle.pass = player.position == '미드필더' ? Util.makeRandomNumber(100, 60) : Util.makeRandomNumber(90, 1)
    player.stat.middle.sight = player.position == '미드필더' ? Util.makeRandomNumber(100, 40) : Util.makeRandomNumber(65, 1)
    player.stat.middle.ballKeep = player.position == '미드필더' ? Util.makeRandomNumber(100, 40) : Util.makeRandomNumber(100, 1)

    player.stat.attack.accelerate = player.position == '공격수' ? Util.makeRandomNumber(100, 40) : Util.makeRandomNumber(70, 1)
    player.stat.attack.scoreAbility = player.position == '공격수' ? Util.makeRandomNumber(100, 60) : Util.makeRandomNumber(70, 1)
    player.stat.attack.shooting = player.position == '공격수' ? Util.makeRandomNumber(100, 40) : Util.makeRandomNumber(75, 1)

    player.stat.goalKeep.block = player.position == '골키퍼' ? (100, 60) : Util.makeRandomNumber(30, 1)
    player.stat.goalKeep.throwBall = player.position == '골키퍼' ? Util.makeRandomNumber(100, 50) : Util.makeRandomNumber(50, 1)
    player.stat.goalKeep.communication = player.position == '골키퍼' ? Util.makeRandomNumber(100, 60) : Util.makeRandomNumber(65, 1)

    player.save();

    let friendship = await new FriendshipInfo(req.body)
    friendship.name = req.body.pName
    friendship.save()

    let latestRecord = await new LatestRecord(req.body)
    latestRecord.pName = req.body.pName
    latestRecord.save()

    userInfo.hasPlayer = true
    await userInfo.save()

    res.status(200).json({resultMsg: 'succees'})

  }catch(err){
    if(err) console.log('err--->', err)
    return res.status(500).json({resultMsg: 'internal error'})
  }
})

module.exports = router
