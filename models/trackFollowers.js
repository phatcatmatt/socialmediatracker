var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackFollowersSchema = new Schema ({
  id: {required: true, type: Number},
  idStr: {required: true, type: String},
  followersByDate: [
    {
      followers: {required: true, type: Number},
      date: {required: true, type: String}
    }
  ]
})

module.exports = mongoose.model('trackFollowers', trackFollowersSchema)
