'use strict';

angular.
module('core.videos').
component('videos', {
    templateUrl: 'core/videos/videos.template.html',
    controller: function VideosController() {
    },
    bindings: {
        videos: '<'
    }
});
