var Twit = require('twit');
var trackFollowers = require('../models/trackFollowers');
var keys = require('../config/keys');

var T = new Twit(keys.twit);

module.exports = {

    findAll: function() {
        return trackFollowers.find({})
            .exec();

    },

    trackAll: function(trackees) {
        var usersToTrack = [];
        for (var i = 0; i < trackees.length; i++) {
            usersToTrack.push(trackees[i].id)
        }
        T.get('users/lookup', {
            user_id: usersToTrack
        }, function(err, data, response) {
            (function asyncFor(arr, i) {
                if (arr.length > i) {
                    trackFollowers.findOne({
                        id: arr[i].id
                    }, function(err, s) {
                        s.followersByDate.push({
                            followers: arr[i].followers_count,
                            date: new Date()
                        });
                        s.save(function(err, response) {
                            if (err) {
                                res.status(500).send(err)

                            } else {
                                asyncFor(arr, i + 1);
                            }
                        })
                    })
                } else {
                    console.log('follwers updated ' + new Date());
                    return
                }


            })(data, 0);


        })
    },






}


// console.log(data[i]);
// s.followersByDate.push('hi')
// s.followersByDate.push({
//   followers: 111111,
//   date: new Date()
// });
