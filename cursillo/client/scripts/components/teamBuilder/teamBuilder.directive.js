angular.module('app').directive('teamBuilder', function () {
  return {
    restrict: 'A',
    templateUrl: 'scripts/components/teamBuilder/teamBuilder.template.html',
    scope: {
      weekendId: '='
    },
    link: function (scope, elem, attrs) {},
    controller: ['$scope', '$uibModal', 'Team', 'Weekend', 'Position', 'WeekendPosition', 'Notification', function ($scope, $uibModal, Team, Weekend, Position, WeekendPosition, Notification) {

      $scope.filledPositions = {};
      $scope.positions = [];
      $scope.weekendPositions = [];
      $scope.people = [];
      $scope.teams = [];

      $scope.selected = {
        team: null
      };

      $scope.loadPositions = function () {

        Position.query(function (positions) {
          $scope.positions = positions;
        });

      };

      $scope.loadTeams = function () {

        Weekend.getTeams({id: $scope.weekendId}, function (teams) {
          $scope.teams = teams;
        });

      };
      
      var markFilledPositions = function () {
        angular.forEach($scope.filledPositions, function (val, key) {
          $scope.filledPositions[key] = false;
        });
        
        angular.forEach($scope.weekendPositions, function (val) {
          if (val.status === 'ACTIVE')
            $scope.filledPositions[val.positionId] = true;
          else
            $scope.filledPositions[val.positionId] = false;
        });
      };


      $scope.loadWeekendPositionsForTeam = function () {
        Team.getWeekendPositions({id: $scope.selected.team.id}, function (weekendPositions) {
          $scope.weekendPositions = weekendPositions;
          markFilledPositions();
        });
      };

      $scope.assignWeekendPositions = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          size: 'lg',
          templateUrl: 'scripts/components/teamBuilder/teamBuilder.modal.template.html',
          controller: 'TeamBuilderModalController',
          resolve: {
            weekendId: function () {
              return $scope.weekendId;
            },
            teamId: function () {
              return $scope.selected.team.id
            }
          }
        });

        modalInstance.result.then(function (selected) {

          if (selected.id) {
            $scope.loadWeekendPositionsForTeam();
          }
          else {
            Notification.error('Error creating weekend position.');
          }

        }, function () {
          // cancelled
        });

      };

      $scope.updateWeekendPositionStatus = function (weekendPosition, status) {
        var oldStatus = weekendPosition.status;

        weekendPosition.status = status;

        WeekendPosition.update({id: weekendPosition.id}, weekendPosition, function (wp) {
          markFilledPositions();
        }, function () {
          // there was an error
          weekendPosition.status = oldStatus;
          Notification.error('Error updating status on Weekend Position.');
        });

      };
      
      $scope.addTeam = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          size: 'lg',
          templateUrl: 'scripts/components/teamBuilder/teamCreate.modal.template.html',
          controller: 'TeamCreateModalController',
          resolve: {
            weekendId: function () {
              return $scope.weekendId;
            }
          }
        });

        modalInstance.result.then(function (selected) {

          if (selected.id) {
            $scope.loadTeams();
          }
          else {
            Notification.error('Error creating team.');
          }

        }, function () {
          // cancelled
        });
        
      };
      
      $scope.manageTeams = function () {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          size: 'lg',
          templateUrl: 'scripts/components/teamBuilder/teamList.modal.template.html',
          controller: 'TeamListModalController',
          resolve: {
            weekendId: function () {
              return $scope.weekendId;
            }
          }
        });

        modalInstance.result.then(function () {
          $scope.loadTeams();
        }, function () {
          // cancelled
          $scope.loadTeams();
        });
        
        
      };

      $scope.loadTeams();
      $scope.loadPositions();

    }]
  }
});
