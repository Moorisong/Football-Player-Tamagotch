const mongoose = require('mongoose')
const trainingSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 12,
    required: true,
    lowerCase: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
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
    stat_01: {
      type: String,
    },
    value_01: {
      type: Number,
      default: 0,
    },
    stat_02: {
      type: String,
    },
    value_02: {
      type: Number,
      default: 0,
    }
  },
  minus:{
    stat_01: {
      type: String,
    },
    value_01: {
      type: Number,
      default: 0,
    },
    stat_02: {
      type: String,
    },
    value_02: {
      type: Number,
      default: 0,
    }
  },
  injury: {
    type: Number,
    default: 0,
  }
})

const Training = mongoose.model('trainings', trainingSchema)
module.exports = { Training }
