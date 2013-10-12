'use strict';

angular.module('freefootieApp')
  .controller('RefCtrl', function ($scope, $resource, $location) {

      $scope.currentGame = null;

      //NOTE: the API and sample data have not concept of people and therefore
      //not concept of referees or players. These will need to be added in order
      //to flesh this controller out properly.
      //
      var teamsSrc = $resource('/api/teams/');
      var locationsSrc = $resource('/api/locations/');
      var gamesSrc = $resource('/api/games/');

      gamesSrc.query(function(games) {
          locationsSrc.query(function(locations){
              var locationNames = {};
              locations.forEach(function (l){
                  locationNames[l.id] = l.name;
              });

              teamsSrc.query(function(teams){
                  var teamNames = {};
                  teams.forEach(function (t){
                      teamNames[t.id] = t.name;
                  });

                  games.forEach(function (g) {
                      g.locationName = locationNames[g.location];
                      g.location = g.location;
                      g.time = new Date(g.time);
                      g.home = teamNames[g.home];
                      g.away = teamNames[g.away];
                  });
                  $scope.games = games.slice(0,2);
              });
          });
      });

      $scope.openDetails = function(gameId) {
        $location.path('ref/game/'+ gameId);
      }
      
  });
