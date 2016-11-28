angular.module('app').directive('personReport', function () {
  return {
    restrict: 'A',
    templateUrl: 'scripts/components/personReport/personReport.template.html',
    scope: {
      personId: '=',
      personGender: '='
    },
    link: function (scope, elem, attrs) {},
    controller: ['$scope', '$uibModal', 'Person', 'Weekend', 'Application', function ($scope, $uibModal, Person, Weekend, Application) {
      $scope.positions;

      $scope.selectedWeekendIds = [];
      $scope.editMode = false;

      $scope.loadWeekends = function () {

        Weekend.query(function (weekends) {
          $scope.selectedWeekendIds = [];
          for (var i = 0; i < weekends.length; i++) {
            $scope.selectedWeekendIds.push(weekends[i].id);
          }
        });

      };

      $scope.loadPositions = function () {
        var filter = {
          id: $scope.personId
        };

        if ($scope.selectedWeekendIds.length !== 0) {
          filter.weekendIds = $scope.selectedWeekendIds.join(',');
        }

        Person.getWeekendPositions(filter, function (positions) {
          console.log('positions', positions);
          $scope.positions = positions;
        });
      };
      
      $scope.loadTalkLinks = function () {
        var filter = {
          id: $scope.personId
        };

        if ($scope.selectedWeekendIds.length !== 0) {
          filter.weekendIds = $scope.selectedWeekendIds.join(',');
        }

        Person.getTalkLinks(filter, function (talkLinks) {
          console.log('talkLinks', talkLinks);
          $scope.talkLinks = talkLinks;
        });
      };

      $scope.filterWeekends = function () {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          size: 'lg',
          templateUrl: 'scripts/components/personReport/weekendFilter.modal.template.html',
          controller: 'WeekendFilterModalController',
          resolve: {
            gender: function () { return $scope.personGender; },
            selectedWeekendIds: function () { return $scope.selectedWeekendIds; }
          }
        });

        modalInstance.result.then(function (weekends) {
          $scope.selectedWeekendIds = weekends;
          $scope.loadPositions();
          $scope.loadTalkLinks();
        });

      };

      $scope.loadWeekends();
      $scope.loadPositions();
      $scope.loadTalkLinks();


    }]

  }
});
