'use strict';

angular.
module('core.playlists').
component('playlists', {
    templateUrl: 'core/playlists/playlists.template.html',
    controller: function PlaylistsController() {
    },
    bindings: {
        playlists: '<'
    }
});
