'use strict';


angular.
module('videoDetail').
component('videoDetail', {
    templateUrl: 'video-detail/video-detail.template.html',
    controller: ['$stateParams','$scope','$http',
        function VideoDetailController($stateParams,$scope,$http) {
           var self = this;
            self.apiKey = 'AIzaSyB0I06cf99_eMR7OahTHeEZWW3dYGSGa0A';

            if($stateParams.videoId) {
                $scope.videoURL = $stateParams.videoId;

                // get videos that related to the video
                $http.get(' https://www.googleapis.com/youtube/v3/search?part=id&maxResults=25&relatedToVideoId='+$stateParams.videoId+'&type=video&key='+self.apiKey)
                    .then(function (response) {
                        var items = response.data.items;
                        var videoIds = '';
                        for(var index in items) {
                            videoIds += items[index].id.videoId + ',';
                        }

                        //get details for videos
                        return $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id='+videoIds+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function (response) {
                        self.videos = response.data.items;
                    });
            }
            else if($stateParams.playlistId) {
                self.playlistURL = $stateParams.playlistId;

                $http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=25&playlistId='+$stateParams.playlistId+'&key='+self.apiKey)
                    .then(function (response) {
                        var items = response.data.items;
                        items.splice(0,1);
                        var videoIds = '';
                        for(var index in items) {
                            videoIds += items[index].contentDetails.videoId + ',';
                        }

                        //get details for videos
                        return $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id='+videoIds+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function (response) {
                        self.videos = response.data.items;
                    });
            }
        }
    ]
});
