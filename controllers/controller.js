var trackFollowers = require('../models/trackFollowers')



module.exports = {

    updateOrAdd: function(req, res, next) {
        trackFollowers.findOne({
            id: req.params.id
        }, function(err, s) {
            if (err) {
                res.status(500).send(err)
            } else if (!s) {
                var newInfo = {
                    id: req.body.id,
                    idStr: req.body.idStr,
                    name: req.body.name,
                    screenName: req.body.screenName,
                    followersByDate: []
                };
                trackFollowers.create(newInfo, function(err, response) {
                    return err ? res.status(500).send(err) : res.send(response)
                })
            } else if (!s.screenName) {
                updateInfo = {
                    name: req.body.name,
                    screenName: req.body.screenName,
                };
                trackFollowers.findOneAndUpdate({
                    id: req.params.id
                }, {
                    $set: {
                        name: req.body.name,
                        screenName: req.body.screenName
                    }
                }, {
                  returnNewDocument: true
                }, function(err, s) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send(s);
                    }
                })
            } else {
                return res.send(s)
            }
        })
    },



}
