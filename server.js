var express = require('express');
var Twit = require('twit');
// var keys = require ('./config/keys');
var mongoose = require('mongoose');
var controller = require('./controllers/controller')
var bodyParser = require('body-parser')

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost:27017/trackFollowers', function(err) {
  if (err) { console.log(err) }
})

var envKeys = {
  consumer_key: process.env[consumer_key],
  consumer_secret: process.env[consumer_secret],
  access_token: process.env[access_token],
  access_token_secret: process.env[access_token_secret]
};

var T = new Twit(envKeys);

app.get('/userSearch/:search', function(req, res, next){
  T.get('statuses/user_timeline', {screen_name: req.params.search, count: 100, exclude_replies: true}, function(err, data, response) {
    return err ? res.status(500).send(err) : res.send(data)
  });
});

app.put('/api/trackFollowers/:id', controller.updateOrAdd);



var port = 3000;
  app.listen(port, function(){
    console.log('full steam ahead on port ' + port)
  })
