const mongoose = require('mongoose')
const friendshipSchema = mongoose.Schema({
  pName: {
    type: String,
    maxlength: 12,
    required: true,
    lowerCase: true,
    unique: true,
  },
  friendship: {
    type: Number,
    default: 0,
  }
})

const FriendshipInfo = mongoose.model('friendships', friendshipSchema);
module.exports = { FriendshipInfo };
