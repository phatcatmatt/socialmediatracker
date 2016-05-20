angular.module('socialMediaTracker').controller('dashCtrl', function($scope, $state, $filter, dashSvc) {

    $scope.latestTweetsData = null;
     $scope.twitterData = [];
     $scope.followersData = [];


    $scope.getLatestTweets = function(handle) {
      if (!handle) {return};
            dashSvc.latestTweets(handle).then(function(response) {
            $scope.latestTweetsData = response.twitterResponse;
            $scope.followersData = response.trackerResponse;
            for (var i = 0; i < $scope.followersData.followersByDate.length; i++) {
              $scope.followersData.followersByDate[i].date = Date.parse((new Date($scope.followersData.followersByDate[i].date)))
            }
            makeTwitterObj($scope.latestTweetsData);
            $state.go('dashView');
        })

    };

    var makeTwitterObj = function(data) {
        $scope.twitterData = [];
        for (var i = 0; i < data.length; i++) {
            $scope.twitterData.push({
                tweetDate: parseDate(data[i].created_at),
                date: data[i].created_at,
                responseType: 'favorites',
                responseSize: data[i].favorite_count,
                tweetText: data[i].text
            }, {
                tweetDate: parseDate(data[i].created_at),
                date: data[i].created_at,
                responseType: 'retweets',
                responseSize: data[i].retweet_count,
                tweetText: data[i].text
            });
        }
        $scope.twitterData.reverse();
    }
    function parseDate(date){
      return($filter('date')(date, 'M/d/yy h:mm a'));
    }

})
