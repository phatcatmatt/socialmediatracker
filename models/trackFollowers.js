var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackFollowersSchema = new Schema ({
  id: {required: true, type: Number},
  idStr: {required: true, type: String},
  currentFollowers: {required: true, type: Number},
  lastChecked: {required: true, type: Number}
})

module.exports = mongoose.model('trackFollowers', trackFollowersSchema)
