var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackFollowersSchema = new Schema ({
  id: {required: true, type: Number},
  idStr: {required: true, type: String},
  name: {required: true, type: String},
  screenName: {required: true, type: String},
  followersByDate: [
    {
      followers: {type: Number},
      date: {type: String}
    }
  ]
})

module.exports = mongoose.model('trackFollowers', trackFollowersSchema)
