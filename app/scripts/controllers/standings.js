'use strict';

angular.module('freefootieApp')
  .controller('StandingsCtrl', function ($scope, $resource) {

      var poolsSrc = $resource('/api/pools/');
      var teamsSrc = $resource('/api/teams/');

      poolsSrc.query(function(pools) {
        teamsSrc.query(function(teams) {
              $scope.standings = {};
              pools.forEach(function (elem){
                  $scope.standings[elem.name] = teams.filter(function (t) { return elem.id === t.pool; } );
              });
        });
      });

  });
