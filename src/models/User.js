const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  id: {
    type: String,
    maxlength: 20,
    required: true,
    trim: true,
    lowerCase: true,
    unique: true,
  },
  pw: {
    type: String,
    minlength: 3,
    requiered: true,
    trim: true,
  },
  age: {
    type: Number,
    requiered: true,
    trim: true
  },
  sex: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    requiered: true,
    trim: true,
    maxlength: 20,
  },
  role:{
    type: Number,
    default: 1,
  },
  registerDate:{
    type: Date,
    default: Date.now(),
  },  
  club: {
    type: String,
    requiered: true,
    default: 'none'
  },
  playerInfo: {
    hasPlayer: {
      type: Boolean,
      default: false,
    },
    playerName: {
      type: String,
      maxlength: 12,
      lowerCase: true,
      unique: true,
    },
  },
})

const User = mongoose.model('users', userSchema);
module.exports = { User };
