'use strict'

angular.module('freefootieApp')
  .directive('purpleCard', function () {
  	return {
      restrict: 'E',
      scope: {
        commit: '&',
        teamOne:'=',
        teamTwo:'='
      },
      template: '<div class="good-behaviour-tab" ng-click="show()" ng-class="{waving: visible, entering: entering}">'
                +'<div class="card-content">'
                  +'<h1>PURPLE CARD</h1>'
                  +'<button ng-click="cycle(); $event.stopPropagation();" class="down-btn">+</button>'
                  +'<button ng-click="cycle(); $event.stopPropagation();" class="hide-btn">X</button>'
                  +'<div>'
                  +'<form class="card-form">'
                  +'<div class="btn-group">'
                  +'<button class="topcoat-button btn-left" ng-class="{selected: selectedTeam==teamOne.id}" ng-click="selectedTeam=teamOne.id; $event.stopPropagation();">{{teamOne.name}}</button>'
                  +'<button class="topcoat-button btn-right" ng-class="{selected:  selectedTeam==teamTwo.id}" ng-click="selectedTeam=teamTwo.id; $event.stopPropagation();">{{teamTwo.name}}</button>'
                  +'</div>'
                  +'<input type="number" class="topcoat-text-input" placeholder="player #" ng-model="playerNumber" ng-click="$event.stopPropagation()"/>'
                   + '<button class="topcoat-button--cta" ng-click="add($event, playerNumber, selectedTeam);">Add</button>'
                  +'</form>'
                +'</div>',
      replace: true,
  		link: function($scope, el, attrs) {

        $scope.visible = false;
        $scope.entering = false;

        $scope.show = function(){
          $scope.visible=true;
          $scope.entering=false;
        };

        $scope.cycle = function(e){
          $scope.visible = false;
          $scope.entering=!$scope.entering;
        };

        $scope.add = function(e, playerNumber, selectedTeam){
          if(playerNumber!=null && playerNumber!=null && selectedTeam!=null){
            $scope.commit()(playerNumber);
            $scope.entering=false;
            $scope.playerNumber=null;
            $scope.selectedTeam=null;
          }
          e.stopPropagation();
        };
  		}
  	};
  });