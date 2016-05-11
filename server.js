var express = require('express');
var Twit = require('twit');
var keys = require ('./config/keys');
var mongoose = require('mongoose');
var controller = require('./controllers/controller')

var app = express();
app.use(express.static(__dirname + '/public'));

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost:27017/trackFollowers', function(err) {
  if (err) { console.log(err) }
})



var T = new Twit(keys.twit);

app.get('/userSearch/:search', function(req, res, next){
  T.get('statuses/user_timeline', {screen_name: req.params.search, count: 100, exclude_replies: true}, function(err, data, response) {
    return err ? res.status(500).send(err) : res.send(data)
  });
});

app.put('/api/trackFollowers /:id', controller.test);



var port = 3000;
  app.listen(port, function(){
    console.log('full steam ahead on port ' + port)
  })
