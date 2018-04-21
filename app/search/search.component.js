'use strict';

angular.
module('search').
component('search', {
    templateUrl: 'search/search.template.html',
    controller:[ '$http','$stateParams','$filter','$scope',
        function SearchController($http,$stateParams,$filter,$scope) {
            var self = this;
            self.apiKey = 'AIzaSyB0I06cf99_eMR7OahTHeEZWW3dYGSGa0A';
            self.queryVal = $stateParams.query;
            self.firstFilter = "any time";
            self.secondFilter = "all";
            self.thirdFilter = "relevance";
            self.toggle = false;
            self.loading = false;
            self.startFilterDate = new Date(0).toISOString();
            self.endFilterDate = new Date().toISOString();

            fetch();

            $scope.select= function(){
                self.toggle = false;
                self.uploadDate = new Date();
                self.endFilterDate = self.uploadDate.toISOString();

                if(self.firstFilter === "any time"){
                    self.uploadDate = new Date(0);
                }
                else if(self.firstFilter === "Last hour"){
                    self.uploadDate.setHours(self.uploadDate.getHours() - 1);
                }
                else if(self.firstFilter === "Today"){
                    self.uploadDate.setHours(0);
                }
                else if(self.firstFilter === "This week"){
                    var date = self.uploadDate.getDate();
                    if(date <= 7)
                    {
                        self.uploadDate.setDate(1);

                    }
                    else if(date >7 && date <= 14)
                    {
                        self.uploadDate.setDate(8);

                    }
                    else if(date >14 && date <= 21)
                    {
                        self.uploadDate.setDate(15);

                    }
                    else if(date >21)
                    {
                        self.uploadDate.setDate(22);

                    }

                }
                else if(self.firstFilter === "This month"){
                    self.uploadDate.setDate(1);
                }
                self.startFilterDate = self.uploadDate.toISOString();
                fetch();
            };

            $scope.toggle = function () {
                self.toggle = !self.toggle;
            };

            function fetch () {
                self.loading = true;
                //search for specific keyword in playlists, videos and channels
                $http.get('https://www.googleapis.com/youtube/v3/search?part=id&maxResults=30&order='+self.thirdFilter+'&publishedAfter='+self.startFilterDate+'&publishedBefore='+self.endFilterDate+'&q='+self.queryVal+'&type='+self.secondFilter+'&key='+self.apiKey)
                    .then(function(response) {
                        self.items = response.data.items;
                        var videoId = '';
                        for(var index in self.items) {
                            if(self.items[index].id.kind === "youtube#video"){
                                videoId += self.items[index].id.videoId + ',';
                            }
                        }

                        //get details for videos
                        return $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id='+videoId+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function(response) {
                        self.word = $stateParams.query;
                        self.videos = response.data.items;
                        var channelId = '';
                        for(var index in self.items) {
                            if(self.items[index].id.kind === "youtube#channel"){
                                channelId += self.items[index].id.channelId + ',';
                            }
                        }
                        //get details for channels
                        return $http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id='+channelId+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function(response){
                        self.channels = response.data.items;
                        var playlistId = '';
                        for(var index in self.items) {
                            if(self.items[index].id.kind === "youtube#playlist"){
                                playlistId += self.items[index].id.playlistId + ',';
                            }
                        }

                        //get details for playlists
                        return $http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id='+playlistId+'&maxResults=25&key='+self.apiKey);
                    })
                    .then(function (response) {
                        self.playlists = response.data.items;
                        self.loading = false;
                    });
            }
        }
    ]
});
