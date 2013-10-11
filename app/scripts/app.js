'use strict';

angular.module('freefootieApp', ['ngResource', 'google-maps'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/ref/game/:id', {
        templateUrl: 'views/ref-details.html',
        controller: 'RefCtrl'
      })
      .when('/ref', {
        templateUrl: 'views/ref.html',
        controller: 'RefCtrl'
      })
       .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
        .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
        .when('/standings', {
        templateUrl: 'views/standings.html',
        controller: 'StandingsCtrl'
      })
        .when('/locationMap/:id', {
        templateUrl: 'views/location-map.html',
        controller: 'LocationMapCtrl'
      })
      .otherwise({
        redirectTo: '/standings'
      });
  }).controller('SystemCtrl', function($scope){
    $scope.$on('$routeChangeSuccess', function(_, x){
        $scope.title = {
            "LocationMapCtrl": "Location",
            "RefCtrl": "Referee",
            "TeamCtrl": "Team", 
            "AdminCtrl": "Administrator",
            "StandingsCtrl": "Free Footie Standings"
        }[x.$$route.controller] + ' Portal';
    });
  }).filter('timedistance', function(){
    return function(time) {
    
    return '3 hours';
}
  });
