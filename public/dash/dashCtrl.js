angular.module('socialMediaTracker').controller('dashCtrl', function($scope, dashSvc) {

    $scope.latestTweetsData = null;
    $scope.twitterData = [];

    $scope.getLatestTweets = function(handle) {
        dashSvc.latestTweets(handle).then(function(response) {
            $scope.latestTweetsData = response;
            makeTwitterObj($scope.latestTweetsData);
        })
    };

    var makeTwitterObj = function(data) {
        $scope.twitterData = [];
        for (var i = 0; i < data.length; i++) {
            $scope.twitterData.push({
                tweetID: data[i].id,
                responseType: 'favorite',
                responseSize: data[i].favorite_count
            }, {
                tweetID: data[i].id,
                responseType: 'retweet',
                responseSize: data[i].retweet_count
            });
        }
        $scope.twitterData.reverse();
    }


})
