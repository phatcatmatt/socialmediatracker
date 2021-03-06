angular.module('socialMediaTracker').controller('dashCtrl', function($scope, $state, $filter, dashSvc, $stateParams) {

    $scope.latestTweetsData = null;
     $scope.twitterData = [];
     $scope.followersData = [];
     $scope.chartTab = true;
     $scope.searchHistory = [];
     $scope.shortHistory = [];
     $scope.showMore = 'show followers';
     $scope.modal = false;

     var getSessionData = function(){
       dashSvc.restoreSession().then(function(sessionData){
         $scope.shortHistory = historyLimiter(sessionData.history);
       })
     }

     getSessionData();

    $scope.getLatestTweets = function(handle) {
      if (!handle) {return} //needs error message
      else if (handle.indexOf(' ') !== -1){
        return; //needs error message
      }
            dashSvc.latestTweets(handle).then(function(response) {
            $scope.latestTweetsData = response.twitterResponse;
            $scope.followersData = response.trackerResponse;
            $scope.searchHistory = response.sessionResponse;
            for (var i = 0; i < $scope.followersData.followersByDate.length; i++) {
              $scope.followersData.followersByDate[i].date = Date.parse((new Date($scope.followersData.followersByDate[i].date)))
            }
            makeTwitterObj($scope.latestTweetsData);
        })
    };

    var makeTwitterObj = function(data) {
      $state.go('dashView');
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
        $scope.shortHistory = historyLimiter($scope.searchHistory);
    }

    function historyLimiter(history) {
      return $filter('limitTo')(history, -3)
    }

    function parseDate(date){
      return($filter('date')(date, 'M/d/yy h:mm a'));
    }

    $scope.barChartShow = function(){
      $scope.chartTab = !$scope.chartTab;
      if (!$scope.chartTab){
        $scope.showMore = 'show tweet data'
      } else {
        $scope.showMore = 'show followers'
      }
    }

    $scope.showModal = function() {
      $scope.modal = !$scope.modal;
    }


})
