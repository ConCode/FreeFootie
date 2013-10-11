'use strict';

angular.module('freefootieApp')
    .controller('LocationMapCtrl', function ($scope, $resource) {
       

        var thisLocationId = 1;
        var teamsSrc = $resource('/api/teams/');
        var locationsSrc = $resource('/api/locations/');
        var gamesSrc = $resource('/api/games/');

        var thisLat;
        var thisLong;
        var thisName;

        var thisLocationSrc;

        locationsSrc.query(function (locations) {
            //thisLocationSrc = locations.filter(function (l) { return l.id === thisLocationId })[0];
            $scope.thisLocation = locations.filter(function (l) { return l.id === thisLocationId })[0];
            thisLat = locations.filter(function (l) { return l.id === 1 })[0].latitude;
            thisLong = locations.filter(function (l) { return l.id === 1 })[0].longitude;
            thisName = locations.filter(function (l) { return l.id === 1 })[0].name;
        });

        // Enable the new Google Maps visuals until it gets enabled by default.
        // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
        google.maps.visualRefresh = true;

        angular.extend($scope, {

            position: {
                coords: {
                    latitude: parseFloat(thisLat),
                    longitude: parseFloat(thisLong)
                }
            },

            /** the initial center of the map */
            centerProperty: {
                latitude: parseFloat(thisLat),
                longitude: parseFloat(thisLong)
            },

            /** the initial zoom level of the map */
            zoomProperty: 4,

            /** list of markers to put in the map */
            markersProperty: [{
                latitude: parseFloat(thisLat),
                longitude: parseFloat(thisLong)
            }],

            // These 2 properties will be set when clicking on the map
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null,

            eventsProperty: {
                click: function (mapModel, eventName, originalEventArgs) {
                    // 'this' is the directive's scope
                    $log.log("user defined event on map directive with scope", this);
                    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
                }
            }
        });
   });
