var sessions = require('../models/sessions')

module.exports = {

  updateOrAddHistory: function(req, res, next) {
    sessions.findByIdAndUpdate(
    req.sessionID,
    {$addToSet:{'history': req.body._id}}, {'new': true, upsert: true},
     function(err, s) {
      if (err){
        console.log(err);
        res.status(500).send(err)
      } else {
        // console.log('history ', s);
        s.save(function(err2, s2) {
          if (err) {
            console.log(err);
          } else {
            console.log('suksks ', s2);
            res.send(s2)
          }
        })
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
