angular.module('socialMediaTracker').service('dashSvc', function($http) {


//load session history on page open
  this.restoreSession = function() {
    return $http({
      method: 'GET',
      url: '/api/session/'
    }).then(function(restoreResponse){
      return restoreResponse.data;
    })
  }




//search for users tweets
  this.latestTweets = function(search) {

      return $http({
          method: 'GET',
          url: '/userSearch/' + search
      })

      .then(function(twitterResponse) {
          var trackInfo = {
              id: twitterResponse.data[0].user.id,
              idStr: twitterResponse.data[0].user.id_str,
              name: twitterResponse.data[0].user.name,
              screenName: twitterResponse.data[0].user.screen_name,
              currentFollowers: twitterResponse.data[0].user.followers_count,
              lastChecked: new Date(),
          };
          //pull users follower history from db or add it to be tracked
          return $http({
              method: 'PUT',
              url: '/api/trackFollowers/' + trackInfo.id,
              data: trackInfo
          })
          .then(function(trackerResponse) {

            //update and get session history
              return $http({
                  method: 'PUT',
                  url: '/api/session/',
                  data: trackerResponse.data
              })

              .then(function(sessionResponse) {
                  var newTwitterResponse = [];
                  for (var i = 0; i < twitterResponse.data.length && i < 30; i++) {
                      twitterResponse.data[i].created_at = new Date(twitterResponse.data[i].created_at)
                      newTwitterResponse.push(twitterResponse.data[i])
                  }
                  var combinedResponse = {
                      twitterResponse: newTwitterResponse,
                      trackerResponse: trackerResponse.data,
                      sessionResponse: sessionResponse.data.history
                  };
                  return combinedResponse;

              })

          })
      })
  }

});
