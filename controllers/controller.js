var trackFollowers = require('../models/trackFollowers')


module.exports = {

  updateOrAdd: function(req, res, next) {
    trackFollowers.findOneAndUpdate({id: req.params.id}, req.body, {new: true, upsert: true})

  },

  test: function(req, res, next) {
    

  }
}
