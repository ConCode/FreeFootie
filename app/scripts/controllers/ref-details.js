'use strict';

angular.module('freefootieApp')
  .controller('RefDetailsCtrl', function ($scope) {

      $scope.home = 0
      $scope.away = 0

       function saveLocally() {
        // To-do: save in temporary storage.
       }

      // Note: Treat home like a boolean
      // Called by "+" button - checks what team.
      $scope.incrementScore = function(home) {
        if (home) {
          $scope.home = parseInt($scope.home) + 1;
        } else {
          $scope.away = parseInt($scope.away) + 1;
        }
        saveLocally();
      }

      // Called by "-" button - check what team.
      $scope.decrementScore = function(home) {
        if (home) {
          if ($scope.home > 0)
            $scope.home = parseInt($scope.home) - 1;
        } else {
          if ($scope.away > 0)
            $scope.away = parseInt($scope.away) - 1;
        }
        saveLocally();
      }
  });
