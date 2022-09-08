const mongoose = require('mongoose')
const latestRecord = mongoose.Schema({
  pName:{
    type: String,
    maxlength: 12,
    required: true,
    lowerCase: true,
    unique: true,
  },
  record: {
    type: Array,
    maxlength: 7
  },
  legend_record: {
    type: Number,
    default: 0
  },
})

const LatestRecord = mongoose.model('latestRecords', latestRecord);
module.exports = { LatestRecord };
