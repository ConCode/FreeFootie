'use strict';

angular.module('freefootieApp', ['ngResource', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/ref/game/:id', {
      templateUrl: 'app/ref/views/ref-details.html',
      controller: 'RefDetailsCtrl'
    })
    .when('/ref', {
      templateUrl: 'app/ref/views/ref.html',
      controller: 'RefCtrl'
    })
    .when('/team', {
      templateUrl: 'app/ref/views/team.html',
      controller: 'TeamCtrl'
    })
    .when('/admin', {
      templateUrl: 'app/admin/views/admin.html',
      controller: 'AdminCtrl'
    })
    .when('/admindetails/:id', {
      templateUrl: 'app/admin/views/admin-game-details.html',
      controller: 'AdminDetailsCtl'
    })
    .when('/standings', {
      templateUrl: 'app/public/views/standings.html',
      controller: 'StandingsCtrl'
    })
    .when('/admin/team/:id', {
      templateUrl: 'app/admin/views/team-details.html',
      controller: 'TeamDetailsCtrl'
    })
    .when('/admin/team', {
      templateUrl: 'app/admin/views/team-admin.html',
      controller: 'TeamAdminCtrl'
    })
    .when('/admin/scheduler', {
      templateUrl: 'app/admin/views/scheduler.html',
      controller: 'SchedulerCtrl'
    })
    .otherwise({
      redirectTo: '/admin'
    });
  }).run(function($rootScope, $location){
    $rootScope.go = function(path) {
      $location.path(path);
    };
  });

