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

  afterTraining: (playerModel) => {
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

    console.log('최조 포인트------legendP_num---->', legendP_num)
    console.log('최초 포인트------commonP_num---->', commonP_num)


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
    }
    else if(legend_attack<common_attack){
      commonP_num+=10
      fightInfo.push({result: "commondWin"})
    }
    else{
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
    fightInfo.forEach((ele, idx)=>{
      console.log(`[${idx+1}]차천--->`, ele.result)
    })
    console.log('결과----> ', legendP_num, commonP_num)
    return {legend: legendP_num, common: commonP_num, fightInfo: fightInfo}
  }

}

module.exports = { Util }
