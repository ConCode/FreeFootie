'use strict';

angular.module('freefootieApp', ['ngResource', 'google-maps', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/ref/game/:id', {
        templateUrl: 'views/ref-details.html',
        controller: 'RefDetailsCtrl'
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
        .when('/team-details/:id', {
            templateUrl: 'views/team-details.html',
            controller: 'TeamDetailsCtrl'
        })
        .otherwise({
            redirectTo: '/ref'
        });
  }).controller('SystemCtrl', function($scope){
    $scope.$on('$routeChangeSuccess', function(_, x){
    $scope.title = {"RefCtrl": "Referee", "RefDetailsCtrl": "Score Card", "TeamCtrl": "Team", "AdminCtrl":"Administrator", "StandingsCtrl":"Free Footie Standings","TeamDetailsCtrl" : "Team Details"}[x.$$route.controller] + ' Portal';
    });
  }).filter('timedistance', function(){
    return function(time) {
      
    return '3 hours';
  }
  });

