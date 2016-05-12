angular.module('socialMediaTracker').service('dashSvc', function($http) {

    this.latestTweets = function(search) {

        return $http({
            method: 'GET',
            url: '/userSearch/' + search
        })

        .then(function(twitterResponse) {
            var trackInfo = {
                id: twitterResponse.data[0].user.id,
                idStr: twitterResponse.data[0].user.id_str,
                currentFollowers: twitterResponse.data[0].user.followers_count,
                lastChecked: new Date(),
            };

            return $http({
                method: 'PUT',
                url: '/api/trackFollowers/' + trackInfo.id,
                data: trackInfo
            })

            .then(function(trackerResponse) {
                var newTwitterResponse = [];
                for (var i = 0; i < twitterResponse.data.length && i < 30; i++) {
                    newTwitterResponse.push(twitterResponse.data[i])
                }
                var combinedResponse = {
                    twitterResponse: newTwitterResponse,
                    trackerResponse: trackerResponse.data
                };
                return combinedResponse;
            })

        })

    }

});



// this.postContent = function(data, user){
//    return $http({
//        method:"POST",
//        url:'/api/post',
//        data:{
//            content: data,
//            user: user
//        }
//    }).success(function( newImage){
//        console.log(newImage._id)
//
//        return $http({
//        method:'GET',
//        url:'/api/me'
//    }).then(function(resp){
//        console.log(resp.data.loc.lat)
//        console.log(resp.data.loc.long)
//        return $http({
//            method:"PUT",
//            url:'/api/post/' + newImage._id,
//            data:{loc: resp.data.loc}
//        })
//    })
//
//    });
// }
