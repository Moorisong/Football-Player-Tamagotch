const Util = {
  randomOfArray: (array, max) => {
    const maxRandomVal = Math.floor(Math.random() * array.length)
    return array[maxRandomVal];
  },

   makeRandomNumber: (max=null, min=null) => {
    //min 값은 1부터 가능함
      if(max && !min){
        const maxRandomVal = Math.random() * posList.length
        return Math.floor(maxRandomVal)
      }else if(max && min){
        const bothRandomVal = (Math.random()*(max-min))+min
        return Math.floor(bothRandomVal)
      }
  }
  }
module.exports = { Util }
