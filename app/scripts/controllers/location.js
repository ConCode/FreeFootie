'use strict';

angular.module('freefootieApp')
    .controller('LocationMapCtrl', function ($scope, $resource, $routeParams, $log) {

        var thisLocationId = parseInt($routeParams.id); 

        var locationsSrc = $resource('/api/locations/');

        google.maps.visualRefresh = true;


        locationsSrc.query(function (locations) {
            $scope.thisLocation = locations.filter(function (l) { return l.id === thisLocationId })[0];

            $scope.markers = [$scope.thisLocation];
            //copy values to center. this object is modified
            //when map is dragged!
            $scope.center = {
                latitude: $scope.thisLocation.latitude,
                longitude: $scope.thisLocation.longitude
            };
        });

      
        angular.extend($scope, {
            
            /** the initial center of the map */
            center: {
                latitude: 0,
                longitude: 0
            },

            /** the initial zoom level of the map */
            zoom: 14,

            /** list of markers to put in the map */
            markers: [],

            // These 2 properties will be set when clicking on the map
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null,

            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    // 'this' is the directive's scope
                    $log.log("user defined event on map directive with scope", this);
                    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
                }
            }
        });
});
