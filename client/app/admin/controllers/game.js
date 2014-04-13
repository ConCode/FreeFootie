'use strict';

angular.module('freefootieApp')
  .controller('GameCtrl', function ($scope, $resource) {

      var teamsSrc = $resource('/api/teams/');
      var locationsSrc = $resource('/api/locations/');
      var gamesSrc = $resource('/api/games/');

      gamesSrc.query(function(games) {
          locationsSrc.query(function(locations){
              var locationNames = {};
              locations.forEach(function (l){
                  locationNames[l._id] = l.name;
              });

              teamsSrc.query(function(teams){
                  var teamNames = {};
                  teams.forEach(function (t){
                      teamNames[t._id] = t.name;
                  });

                  games.forEach(function (g) {
                      g.location = locationNames[g.location];
                      g.time = new Date(g.time);
                      g.home = teamNames[g.home];
                      g.away = teamNames[g.away];
                  });
                  $scope.games = games;
              });
          });
      });
});
