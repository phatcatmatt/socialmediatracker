var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  profileID: {type: Number}
})

module.exports = mongoose.model('User', userSchema);
