'use strict';

angular.module('freefootieApp')
  .controller('GameDetailsCtrl', function ($scope, $routeParams, $resource, $filter) {

  	var Game = $resource('/api/games/:id');
  	var Location = $resource('/api/locations/:id');
  	var Team = $resource('/api/teams/:id');

    $scope.locations = Location.query();
    $scope.teams = Team.query();

    $scope.home=null;
    $scope.away=null;

    $scope.updateTeams=function(){
      $scope.home = getTeamById($scope.game.home);
      $scope.away = getTeamById($scope.game.away);
    };

    function getTeamById(id){
      for(var i=0; i<$scope.teams.length; i++){
        var team = $scope.teams[i];
        if(team.id==id)
          return team;
      }
      return null;
    }

  	$scope.game = Game.get({id: $routeParams.id},prepGameObject);

    function prepGameObject(item){
       //TEMP WORKAROUND FOR SAMPLE DATA USING MIX OF NUMBERS AND STRINGS..
        if(item.location)
          item.location+='';

        if(item.home)
        item.home+='';

        if(item.away)
          item.away+='';
        //END WORKAROUND

        $scope.updateTeams();

        var date = new Date(item.date);
        item.dateobj = $filter("date")(date, 'yyyy-MM-dd');
        item.timeobj =  getTime(date);
      }

      $scope.updateDate = function(){
        console.log('update...');
        var date = new Date($scope.game.dateobj);
        var timezoneOffset = date.getTimezoneOffset();
        date.setTime(date.getTime()+(timezoneOffset*60*1000));

        var hour = $scope.game.timeobj.hours;

        if($scope.game.timeobj.isPm)
          hour+=(hour==12 ? 0:12);
        else if(hour==12)
          hour=0;

        date.setHours(hour);
        date.setMinutes($scope.game.timeobj.minutes);

        $scope.game.date=date;

        console.log(date);
      };

      $scope.save = function(){
        $scope.game.$save(prepGameObject);
      };

      function getTime(date){
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var isPm = hours >= 12;

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;

        return {
          hours: hours,
          minutes: minutes,
          isPm: isPm
        };
      }
      
      $scope.hourOptions=[];
      $scope.minuteOptions=[];

      for(var i=1; i<=12; i++)
        $scope.hourOptions.push(i);

      for(var i=0; i<=59; i+=5)
        $scope.minuteOptions.push(i);

      $scope.formatMinute = function(minute){
        return (minute<10?'0':'')+minute;
      };
  });