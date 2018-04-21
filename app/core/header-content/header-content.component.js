'use strict';

angular.
module('core.headerContent').
component('headerContent', {
    templateUrl: 'core/header-content/header-content.template.html',
    controller: ['$scope','$state','$stateParams',
        function HeaderContentController($scope, $state,$stateParams) {

            $scope.submit = function() {
                if($scope.text) {
                    $state.go('search', {
                        query: $scope.text
                    });
                }
            };

            $scope.text = $stateParams.query;

            $scope.$on( "$locationChangeStart", function(event, next) {

                var u =decodeURI(next.toString());
                var position = u.search("query=");
                if(position === -1) {
                   var position = u.search('search');
                   if(position!==-1){
                       $scope.text ='';
                   }
                }
                else{
                    var query = u.slice(position + 6, u.length);
                    $scope.text = query;
                }
            });

        }
    ]
});
