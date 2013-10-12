'use strict';

angular.module('freefootieApp')
.controller('TeamCtrl', function ($scope, $resource) {

    var currentTeam = 2; //this should be input as a parameter!

    var teamsSrc = $resource('/api/teams/');
    var locationsSrc = $resource('/api/locations/');
    var gamesSrc = $resource('/api/games/');

    teamsSrc.query(function(teams){

        $scope.team = teams.filter(function(t){t.id === currentTeam})[0];

        var teamNames = {};
        teams.forEach(function (t){
            teamNames[t.id] = t.name;
        });

        gamesSrc.query(function(games) {
            locationsSrc.query(function(locations){
                var locationNames = {};
                locations.forEach(function (l){
                    locationNames[l.id] = l.name;
                });

                games = games.filter(function(g){
                    return g.home === currentTeam || g.away === currentTeam;
                });

                games.forEach(function (g) {
                    g.locationName = locationNames[g.location];
                    g.location = g.location;
                    g.time = new Date(g.time);
                    g.home = teamNames[g.home];
                    g.away = teamNames[g.away];
                });
                $scope.games = games;
            });
        });
    });
});
