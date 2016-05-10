angular.module('socialMediaTracker').controller('dashCtrl', function($scope, dashSvc){

$scope.latestTweetsData = null;
$scope.instaData = null;
$scope.twitterData = [];

$scope.getLatestTweets = function(term){
  dashSvc.latestTweets(term).then(function(response){
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
    },
    {
      tweetID: data[i].id,
      responseType: 'retweet',
      responseSize: data[i].retweet_count
    })
  }
  $scope.twitterData.reverse();
  console.log($scope.twitterData)
}




$scope.getInsta = function(){
  console.log('one');
  dashSvc.instagram().then(function(response){
    console.log('three');
    $scope.instaData = response
  })
}


$scope.testData = [
  {
  tweetID: 7786568,
    responseType: 'favorite',
    responseSize: 98
  },
  {
    tweetID: 7786568,
    responseType: 'retweet',
    responseSize: 19
  },
  {
    tweetID: 7786569,
    responseType: 'favorite',
    responseSize: 322
  },
  {
    tweetID: 7786569,
    responseType: 'retweet',
    responseSize: 55
  },
  {
    tweetID: 7786570,
    responseType: 'favorite',
    responseSize: 274
  },
  {
    tweetID: 7786570,
    responseType: 'retweet',
    responseSize: 38
  },
  {
    tweetID: 7786571,
    responseType: 'favorite',
    responseSize: 5
  },
  {
    tweetID: 7786571,
    responseType: 'retweet',
    responseSize: 158
  },
  {
    tweetID: 7786572,
    responseType: 'favorite',
    responseSize: 515
  },
  {
    tweetID: 7786572,
    responseType: 'retweet',
    responseSize: 127
  },
  {
    tweetID: 7786573,
    responseType: 'favorite',
    responseSize: 344
  },
  {
    tweetID: 7786573,
    responseType: 'retweet',
    responseSize: 49
  },
  {
    tweetID: 7786574,
    responseType: 'favorite',
    responseSize: 247
  },
  {
    tweetID: 7786574,
    responseType: 'retweet',
    responseSize: 41
  }
];

})
