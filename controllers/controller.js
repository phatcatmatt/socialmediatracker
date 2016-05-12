var trackFollowers = require('../models/trackFollowers')


module.exports = {

    updateOrAdd: function(req, res, next) {
                trackFollowers.findOne({id: req.params.id}, function(err, s) {
            if (err) {
                res.status(500).send(err)
            }
            else if(!s) {
                var newInfo = {
                    id: req.body.id,
                    idStr: req.body.idStr,
                    followersByDate: [{
                        followers: req.body.currentFollowers,
                        date: req.body.lastChecked
                    }]
                };
                trackFollowers.create(newInfo, function(err, response) {
                    return err ? res.status(500).send(err) : res.send(response)
                })
            } else {
                s.followersByDate.push({
                    followers: req.body.currentFollowers,
                    date: req.body.lastChecked
                });
                s.save(function(err, response) {
                    return err ? res.status(500).send(err) : res.send(response)
                })
            }
        })

    },

}
