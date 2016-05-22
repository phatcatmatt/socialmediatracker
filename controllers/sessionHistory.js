var sessions = require('../models/sessions')

module.exports = {

  updateOrAddHistory: function(req, res, next) {
    console.log(req.body);
    sessions.findByIdAndUpdate(
    req.sessionID,
    {$push:{'history': req.body._id}},
     function(err, s) {
      if (err){
        console.log(err);
        res.status(500).send(err)
      } else {
        console.log('we doin this');
        console.log(s.history);
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
