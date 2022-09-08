const mongoose = require('mongoose')
const legend = mongoose.Schema({
  pName:{
    type: String,
    maxlength: 12,
    required: true,
    lowerCase: true,
  },
  accWin: {
    type: Number,
    default: 0,
  },
  turnNum: {
    type: Number,
    default: 0,
  },
})

const Legend = mongoose.model('legends', legend);
module.exports = { Legend }
