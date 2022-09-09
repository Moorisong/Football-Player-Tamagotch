const mongoose = require('mongoose')
const trainingSchema = mongoose.Schema({
  pName: {
    type: String,
    maxlength: 12,
    required: true,
    lowerCase: true,
    unique: true
  },
  last_training_date: {
    type: Date,
    default: null
  },
  entireTrainCnt: {
    type: Number,
    default: 0,
  },
  partTrainCnt: {
    type: Number,
    default: 0,
  },
  plus:{
    value: {
      type: Array,
      maxlength: 7,
      default: []
    },
    stat: {
      type: Array,
      maxlength: 7,
      default: []
    }
  },
  minus:{
    value: {
      type: Array,
      maxlength: 7,
      default: []
    },
    stat: {
      type: Array,
      maxlength: 7,
      default: []
    }
  },
  injury: {
    type: Number,
    default: 0,
  }
})

const Training = mongoose.model('trainings', trainingSchema)
module.exports = { Training }
