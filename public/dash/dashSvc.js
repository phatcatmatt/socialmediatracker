angular.module('socialMediaTracker').service('dashSvc', function($http){



this.latestTweets = function(search){
  return $http({
    method: 'GET',
    url: '/test/' + search
  }).then(function(response){
    var newResponse = [];
    for(var i = 0; i < response.data.length && i < 5; i++){
      newResponse.push(response.data[i])
    }
  return newResponse
  })
}

this.instagram = function(){
  console.log('two');
  return $http({
    method: 'GET',
    url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=44966665.7e702b8.0b27597d436c466d852f911fa9ba8815'
  }).then(function(response){
    return response.data;
  })
}
})
