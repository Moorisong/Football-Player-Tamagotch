const mongoose = require('mongoose')
const playerSchema = mongoose.Schema({
  pName: {
    type: String,
    maxlength: 12,
    required: true,
    lowerCase: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    lowerCase: true,
  },
  age: {
    type: Number,
    maxlength: 2,
    required: true,
    lowerCase: true,
  },
  backNumber: {
    type: Number,
    maxlength: 2,
    required: true,
  },
  position: {
    type: String,
    required: true,
    lowerCase: true,
  },
  stat: {
    common: {
      height: {
        type: Number,
      },
      weight: {
        type: Number
      },
      foot: {
        type: String
      },
    },
    defender: {
      defense:{
        type: Number,
      },
      mark:{
        type: Number,
      },
      endurance:{
        type: Number,
      },
    },
    middle:{
      pass:{
        type: Number,
      },
      sight:{
        type: Number,
      },
      ballKeep:{
        type: Number,
      },
    },
    attack:{
      accelerate:{
        type: Number,
      },
      scoreAbility:{
        type: Number,
      },
      shooting:{
        type: Number,
      },
    },
    goalKeep:{
      block:{
        type: Number,
      },
      throwBall:{
        type: Number,
      },
      communication:{
        type: Number,
      }
    }
  },
  training: {
    onTrain: {
      type: Boolean,
      default: false,
    },
    trainType: {
      type: String,
      default: null
    },
    startTime:{
      type: Date,
      default: null
    },
  },
  injury: {
    onInjury: {
      type: Boolean,
      default: false,
    },
    startTime:{
      type: Date,
      default: null
    },
  },
  competition: {
    onFight: {
      type: Boolean,
      default: false,
    }
  }
})

const Player = mongoose.model('players', playerSchema);
module.exports = { Player };
