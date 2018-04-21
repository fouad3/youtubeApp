'use strict';

angular.
    module('channelDetail').
    component('channelDetail', {
        templateUrl:  'channel-detail/channel-detail.template.html',
        controller: ['$http','$stateParams',
            function ChannelDetailController($http, $stateParams){
                var self = this;
                self.apiKey = 'AIzaSyB0I06cf99_eMR7OahTHeEZWW3dYGSGa0A';


                // get channel details
                $http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id='+$stateParams.channelId+'&maxResults=25&key='+self.apiKey)
                    .then(function (response) {
                        self.channel = response.data.items[0];
                        // get channel's playlists
                        return $http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId='+$stateParams.channelId+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function (response) {
                        self.playlists = response.data.items;

                        // get channel's videos
                        return $http.get('https://www.googleapis.com/youtube/v3/search?part=id&channelId='+$stateParams.channelId+'&maxResults=25&type=video&key='+self.apiKey);
                    })
                    .then(function (response) {
                        var items = response.data.items;
                        var videoId = '';
                        for(var index in items) {
                            videoId += items[index].id.videoId + ',';
                        }

                        //get details for videos
                        return $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id='+videoId+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function (response) {
                        self.videos = response.data.items;
                    });

        }]
});