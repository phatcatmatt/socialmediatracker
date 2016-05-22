var sessions = require('../models/sessions')

module.exports = {

  updateOrAddHistory: function(req, res, next) {
    sessions.findByIdAndUpdate(
    req.sessionID,
    {$push:{'history': req.body}},
     function(err, s) {
      if (err){
        console.log(err);
        res.status(500).send(err)
      } else {
        console.log('we doin this');
        res.send(200);
        // if (s.searchHistory) {
        //   s.searchHistory.push()
        // }
        // else {
        //   var searchHistory = []
        //   searchHistory.push
        // }
      }
    }
    )
  }


}
