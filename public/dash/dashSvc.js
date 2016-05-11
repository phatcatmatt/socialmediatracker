angular.module('socialMediaTracker').service('dashSvc', function($http) {

    this.latestTweets = function(search) {

        return $http({
            method: 'GET',
            url: '/userSearch/' + search
        })

        .success(function(twitterResponse) {
            var trackInfo = {
                id: twitterResponse[0].user.id,
                idStr: twitterResponse[0].user.id_str,
                currentFollowers: twitterResponse[0].user.followers_count,
                lastChecked: new Date(),
            };

            return $http({
                method: 'PUT',
                url: '/api/trackFollowers/' + trackInfo.id,
                data: trackInfo
            })

            .then(function(trackerResponse) {
                console.log(trackerResponse.data);
                var newTwitterResponse = [];
                for (var i = 0; i < twitterResponse.length && i < 30; i++) {
                    newTwitterResponse.push(twitterResponse.data[i])
                }
                var combinedResponse = {
                    twitterResponse: newTwitterResponse.data,
                    trackerResponse: trackerResponse.data
                };
            })

        })
    }

});
