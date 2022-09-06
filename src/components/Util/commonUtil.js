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


}

module.exports = { Util }
