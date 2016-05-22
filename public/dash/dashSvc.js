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
                name: twitterResponse.data[0].user.name,
                screenName: twitterResponse.data[0].user.screen_name,
                currentFollowers: twitterResponse.data[0].user.followers_count,
                lastChecked: new Date(),
            };

            return $http({
                method: 'PUT',
                url: '/api/trackFollowers/' + trackInfo.id,
                data: trackInfo
            })

            .then(function(trackerResponse) {
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
                        sessionResponse: sessionResponse.data
                    };
                    return combinedResponse;

                })

            })
        })
    }

});
