var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionsSchema = new Schema ({
  _id: {required: true, type: String},
  session: {required: true, type: String},
  expires: {required: true, type: Date},
  history: [{type: Schema.Types.ObjectId, ref: 'trackFollowers'}]
})

module.exports = mongoose.model('sessions', sessionsSchema)
