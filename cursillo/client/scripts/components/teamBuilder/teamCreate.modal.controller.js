angular.module('app')
  .controller('TeamCreateModalController', ['$scope', 'Team', '$uibModalInstance', 'weekendId',  function ($scope, Team, $uibModalInstance, weekendId) {

    $scope.team = {
      weekendId: weekendId,
      isTable: true
    };
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.createTeam = function () {
      Team.create($scope.team, function (team) {
        $uibModalInstance.close(team);
      });
    };

    
  }]);
