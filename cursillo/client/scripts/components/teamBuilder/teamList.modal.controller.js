angular.module('app')
  .controller('TeamListModalController', ['$scope', 'Team', 'Weekend', '$uibModalInstance', 'weekendId',  function ($scope, Team, Weekend, $uibModalInstance, weekendId) {

    $scope.weekendId = weekendId;
    $scope.teams = [];
    
    $scope.team = {
      weekendId: weekendId
    };
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.loadTeams = function () {
      
      Weekend.getTeams({id: $scope.weekendId}, function (teams) {
        console.log('teams', teams);
        $scope.teams = teams;
      });
      
    };
    
    $scope.deleteTeam = function (teamId, index) {
      Team.deleteWeekendPositions({id: teamId}, function () {
        Team.delete({id: teamId}, function () {
          $scope.teams.splice(index, 1);
        });
      });
    };
    
    $scope.loadTeams();
    
    
  }]);
