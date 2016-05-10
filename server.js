var express = require('express');
var Twit = require('twit');
var keys = require ('./config/keys');
var ig = require('instagram-node').instagram();
// var cors = require('cors')
// var session = require('express-session')
// var bodyParser = require('body-parser');
// var passport = require('passport');
// var TwitterStrategy = require('passport-twitter');
// var InstagramStrategy = require('passport-instagram');
// var mongoose = require('mongoose');

// var controller = require('./controllers/controller')
// var User = require('./models/usersModel')


var app = express();
// app.use(cors());

// mongoose.connect('mongodb://localhost/users', function(err) {
//     if (err) { console.log(err) } })
// app.use(session ({secret: keys.sessionSecret}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(__dirname + '/public'));


var T = new Twit(keys.twit);

app.get('/test/:search', function(req, res, next){
  T.get('statuses/user_timeline', { screen_name: req.params.search, count: 20, exclude_replies: true }, function(err, data, response) {
    if(err){
      console.log(err)
      return res.send(err)
    } else {
      res.send(data)
    }
  });
});


    app.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + keys.ig.access_token, function(req, res, next) {
        console.log('bark');
        if (err) {
            return console.log('whoops')
        } else {
            res.send(data)
        }
    })


// ig.use(keys.ig.client)
// ig.use(keys.ig.access_token)


// ig.user('phatcatmatt', function(err, result, remaining, limit) {
//   console.log(result)
// });
//
//
// var bot = function(){
//   var tweet = 'is this thing on?'
//   T.post('statuses/update', tweet, function(err, data, s){
//     if (err){
//       console.log(err)
//     } else {
//       console.log(tweet)
//     }
//   });
// }
//
// bot();
//

// var cbird = new Codebird;
// cbird.setConsumerKey('keys.twitter.consumerKey', 'keys.twitter.consumerSecret')
// cbird.setToken('keys.twitter.accessToken', 'keys.twitter.accessTokenSecret');
//
// var client = new Twitter ({
//   consumer_key: 'keys.twitter.consumerKey',
//   consumer_secret: 'keys.twitter.consumerSecret',
//   access_token_key: 'keys.twitter.accessToken',
//   access_token_secret: 'keys.twitter.accessTokenSecret'
// });

// app.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=tacobellcount=10', function(req, res, next){
//   console.log('three')
//   console.log(res);
// })

// var params = {screen_name: 'tacobell'};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   if (!error) {
//     console.log(tweets);
//   }
// });

// cbird.__call(
//     "oauth2_token",
//     {},
//     function (reply, err) {
//         var bearer_token;
//         if (err) {
//             console.log("error response or timeout exceeded" + err.error);
//         }
//         if (reply) {
//             bearer_token = reply.access_token;
//             console.log(reply.access_token)
//             console.log('^^^^^')
//         }
//     }
// );

// passport.use(new TwitterStrategy({
//     consumerKey: keys.twitter.consumerKey,
//     consumerSecret: keys.twitter.consumerSecret,
//     callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//   },
//     // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     function(token, refreshToken, profile, done){
//     return done(null, profile);
//   }
// ));
//
// app.get('/auth/twitter', passport.authenticate('twitter'));
//
// app.get('/auth/twitter/callback', passport.authenticate('twitter', {
//   successRedirect: '/me',
//   failureRedirect: '/'
// }));
//
// passport.use(new InstagramStrategy({
//     clientID: keys.instagram.clientID,
//     clientSecret: keys.instagram.clientSecret,
//     callbackURL: "http://localhost:3000/auth/instagram/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//   User.findOne({
//            'profileID': profile.id
//        }, function(err, user) {
//            if (err) {
//                return done(err);
//            }
//            if (!user) {
//                user = new User({
//                   //  name: profile.displayName,
//                   //  email: profile.emails[0].value,
//                   //  username: profile.username,
//                   //  provider: 'facebook',
//                    profileID: profile._json
//                });
//                user.save(function(err) {
//                    if (err) console.log(err);
//                    return done(err, user);
//                });
//            } else {
//                //found user. Return
//                return done(err, user);
//            }
// })}));
//
//
// app.get('/auth/instagram', passport.authenticate('instagram'));
// app.get('/auth/instagram/callback', passport.authenticate('instagram', {
//   successRedirect: '/me',
//   failureRedirect: '/'
// }));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// app.get('/me', function(req, res){
//   res.send(req.user);
// });




var port = 3000;
  app.listen(port, function(){
    console.log('full steam ahead on port ' + port)
  })
