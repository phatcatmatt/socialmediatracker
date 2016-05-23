var sessions = require('../models/sessions');

module.exports = {

    updateOrAddHistory: function(req, res, next) {
        sessions.findByIdAndUpdate(
            req.sessionID, {
                $addToSet: {
                    'history': req.body._id
                }
            }, {
                'new': true,
                upsert: true
            }
        ).populate('history').exec(function(err, s){
          if (err){
            res.status(500).send(err);
          } else {
            res.send(s);
          }
        })
    }


}
