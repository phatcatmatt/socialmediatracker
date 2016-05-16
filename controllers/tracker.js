var Twit = require('twit');
var trackFollowers = require('../models/trackFollowers');
var keys = require ('../config/keys');

var T = new Twit(keys.twit);

module.exports = {

  findAll: function(req, res, next) {
    trackFollowers.find({}, function(err, s){
      if (err){
        res.status(500).send(err)
      } else {
        req.allUsers = s;
        next()
      }
    })
  },

  trackAll: function(req, res, next) {
    var usersToTrack = [];
    for (var i = 0; i < req.allUsers.length; i++) {
      usersToTrack.push(req.allUsers[i].id)
    }
    T.get('users/lookup', {user_id: usersToTrack}, function(err, data, response){
      // for (var i = 0; i < data.length; i++){
      //   trackFollowers.findOne({id: data[i].id}, function(err, s){
      //     if (err){
      //       res.status(500).send(err)
      //     } else {
      //
      //     }
      //   })
      // }
    })
    res.send(200);
  }






}
