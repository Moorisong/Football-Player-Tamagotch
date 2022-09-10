const { FriendshipInfo } = require("../../models/FriendshipInfo");
const { Training } = require("../../models/Training");

const Util = {
  randomOfArray: (array) => {
    //배열에서 하나의 요소를 랜덤으로 리턴
    const maxRandomVal = Math.floor(Math.random() * array.length)
    return array[maxRandomVal];
  },

   makeRandomNumber: (max=null, min=null) => {
    //min 값은 1부터 넣어야함
    //최대값과 범위 안의 값을 반환할 수 있으며, 최소값 기능은 없음
      if(max && !min){
        const maxRandomVal = Math.random() * max
        return Math.floor(maxRandomVal)
      }else if(max && min){
        const bothRandomVal = (Math.random()*(max-min))+min
        return Math.floor(bothRandomVal)
      }
  },

  afterTraining: (playerModel, trainingModel,type, resultInfo) => {

    console.log('trainingModel-----before---> ', trainingModel)

    trainingModel.last_training_date = new Date()
    type == 'entire' ? trainingModel.entireTrainCnt +=1 : trainingModel.partTrainCnt +=1

    if(resultInfo.plusValue>-1){
      if(trainingModel.plus.value.length >= 7) trainingModel.plus.value = []
      trainingModel.plus.value.push(resultInfo.plusValue)
    }

    if(resultInfo.plusStat || resultInfo.plusStat == null){
      if(trainingModel.plus.stat.length >= 7) trainingModel.plus.stat = []
      trainingModel.plus.stat.push(resultInfo.plusStat)
    }

    if(resultInfo.minusValue<0){
      if(trainingModel.minus.value.length >= 7) trainingModel.minus.value = []
      trainingModel.minus.value.push(resultInfo.minusValue)
    }

    if(resultInfo.minusStat){
      if(trainingModel.minus.stat.length >= 7) trainingModel.minus.stat = []
      trainingModel.minus.stat.push(resultInfo.minusStat)
    }

    trainingModel.save()

    console.log('trainingModel-----after---> ', trainingModel)


    playerModel.training.onTrain = false
    playerModel.training.trainType = null
    playerModel.training.startTime = null

    playerModel.save()
  },

  sumStatWithType: (player, statType) => {
    const statArr = Object.keys(player.stat[statType])
    const result = player.stat[statType][statArr[0]] + player.stat[statType][statArr[1]] + player.stat[statType][statArr[2]]
    return result
   },

  compareAndFight : (legendPlayer, commonPlayer) => {

    let legendP_num = Util.makeRandomNumber(50,1)
    let commonP_num = Util.makeRandomNumber(50,1)
    let fightInfo = []

    const legend_defender = Util.sumStatWithType(legendPlayer, 'defender')
    const common_defender = Util.sumStatWithType(commonPlayer, 'defender')


    if(legend_defender>common_defender){
      legendP_num+=10
      fightInfo.push({result: "legendWin"})
    }
    else if(legend_defender<common_defender){
      commonP_num+=10
      fightInfo.push({result: "commonWin"})
    }
    else{
      legendP_num+=10
      commonP_num+=10
      fightInfo.push({result: "sameScore"})
    }

    const legend_middle = Util.sumStatWithType(legendPlayer, 'middle')
    const common_middle = Util.sumStatWithType(commonPlayer, 'middle')

    if(legend_middle>common_middle){
      legendP_num+=10
      fightInfo.push({result: "legendWin"})
    }
    else if(legend_middle<common_middle){
      commonP_num+=10
      fightInfo.push({result: "commondWin"})
    }
    else{
      legendP_num+=10
      commonP_num+=10
      fightInfo.push({result: "sameScore"})
    }

    const legend_attack = Util.sumStatWithType(legendPlayer, 'attack')
    const common_attack = Util.sumStatWithType(commonPlayer, 'attack')

    if(legend_attack>common_attack){
      legendP_num+=10
      fightInfo.push({result: "legendWin"})
    }else if(legend_attack<common_attack){
      commonP_num+=10
      fightInfo.push({result: "commondWin"})
    }else{
      const luckyNum = Util.makeRandomNumber(100,1)
      if(luckyNum>=50){
        legendP_num+=luckyNum
        fightInfo.push({result: "sameScore-legendWin-lucky"})
      }
      else{
        commonP_num+=luckyNum
        fightInfo.push({result: "sameScore-commonWin-lucky"})
      }
    }
    return {legend: legendP_num, common: commonP_num, fightInfo: fightInfo}
  },

  occurInjury: async (pModel, tModel) =>{
    try{
      const injuryLuckyNum = Util.makeRandomNumber(100, 1)

      if(injuryLuckyNum<=20){

        pModel.injury.onInjury = true
        pModel.injury.startTime  = new Date()

        tModel.injury += 1

        pModel.save()
        tModel.save()

        return true
      }
    }catch(err){
      if(err) console.log('err--->', err)
      return false
     }
  }
}

module.exports = { Util }
