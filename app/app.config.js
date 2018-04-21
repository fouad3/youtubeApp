'use strict';

angular.
  module('youtubeApp').
  config(['$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/search');
      $stateProvider.
        state('search', {
          url:'/search?query',
          template: '<search></search>',
          params:{
              query: {
                  value:''
              }
          }
        }).
        state('channel', {
          url:'/channel/:channelId',
          template: '<channel-detail></channel-detail>',
          params:{
              channelId: {
                  value:''
              },
              queryVal:''
          }
        }).
        state('video', {
          url:'/video/:videoId/:playlistId',
          template: '<video-detail></video-detail>',
          params:{
              videoId: {
                  value: '',
                  squash: true
              },
              playlistId: {
                  value: '',
                  squash: true
              },
              queryVal:''
          }
        })
    }
  ]);
