var express = require('express');
var Twit = require('twit');
var keys = require('./config/keys');
var mongoose = require('mongoose');
var controller = require('./controllers/controller')
var bodyParser = require('body-parser');
var tracker = require('./controllers/tracker');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost:27017/trackFollowers', function(err) {
    if (err) {
        console.log(err)
    }
})



var T = new Twit(keys.twit);

app.get('/userSearch/:search', function(req, res, next) {
    T.get('statuses/user_timeline', {
        screen_name: req.params.search,
        count: 100,
        exclude_replies: true,
        include_rts: false
    }, function(err, data, response) {
        return err ? res.status(500).send(err) : res.send(data)
    });
});

app.put('/api/trackFollowers/:id', controller.updateOrAdd);

setInterval(function() {
    tracker.findAll()
        .then(function(results) {
            tracker.trackAll(results);
        })


}, 900000)


// get a list of users who follow a specified id
// app.get('/api/followersList/:user', function(req, res, next) {
//   T.get('/followers/list', {user_id: req.params.user, count: 50, skip_status: true, include_user_entities: true}, function(err, data, response) {
//     return err ? res.status(500).send(err) : res.send(data)
//   });
// });



app.listen(keys.port, function() {
    console.log('full steam ahead on port ' + keys.port)
})
