angular.module('socialMediaTracker').controller('dashCtrl', function($scope, $state, dashSvc) {

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
            // var x = ($scope.followersData.followersByDate[0].date);
            // var y = Date.parse((new Date(x)));
            // console.log(y);
            // console.log($scope.followersData);

            $state.go('dashView');
        })

    };

    var makeTwitterObj = function(data) {
        $scope.twitterData = [];
        $scope.barChartXCounter = data.length;
        for (var i = 0; i < data.length; i++) {
            $scope.twitterData.push({
                tweetID: (data.length) - (i),
                responseType: 'favorites',
                responseSize: data[i].favorite_count
            }, {
                tweetID: (data.length) - (i),
                responseType: 'retweets',
                responseSize: data[i].retweet_count
            });
        }
        $scope.twitterData.reverse();
    }


})
