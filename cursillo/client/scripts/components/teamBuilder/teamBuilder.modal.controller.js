angular.module('app')
  .controller('TeamBuilderModalController', ['$scope', 'Position', 'WeekendPosition', 'Person', '$uibModalInstance', 'weekendId', 'teamId', function ($scope, Position, WeekendPosition, Person, $uibModalInstance, weekendId, teamId) {

    $scope.selected = {
      positionId: null,
      personId: null
    };

    $scope.weekendId = weekendId;
    $scope.teamId = teamId;
    
    $scope.positions = [];
    $scope.people = [];
    $scope.weekendPositions = [];
    $scope.weekendPositionPeople = [];

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.loadPeopleByPositionId = function () {
      Position.getPeople({id: $scope.selected.positionId}, function (people) {
        var med = {}, res = [];
        
        console.log('people', people);

        angular.forEach(people, function (val) {
          debugger;
          if (med[val.personId]) {
            med[val.personId].count++;
          }
          else {
            med[val.personId] = {
              personId: val.personId,
              firstName: val.firstName,
              lastName: val.lastName,
              count: 1
            }
          }
        });

        angular.forEach(med, function (val) {
          res.push(val);
        });

        $scope.weekendPositionPeople = res;

      });
    };

    $scope.loadPositions = function () {
      Position.query(function (positions) {
        $scope.positions = positions;
      });
    };

    $scope.loadPeople = function () {
      Person.query(function (people) {
        $scope.people = people;
      });
    };

    $scope.getFullName = function (person) {
      return [person.firstName, person.lastName].join(' ');
    };

    $scope.selectPerson = function (id) {
      $scope.selected.personId = id;
    };

    $scope.loadPeopleWeekendPositions = function () {
      if ($scope.selected.personId) {
        Person.getWeekendPositions({id: $scope.selected.personId}, function (weekendPositions) {
          console.log('weekend positions', weekendPositions);
          $scope.weekendPositions = weekendPositions;
        });
      }
      else {
        $scope.weekendPositions = [];
      }
    };

    $scope.createWeekendPosition = function () {
      var weekendPosition = {
        positionId: $scope.selected.positionId,
        teamId: $scope.teamId,
        personId: $scope.selected.personId,
        status: 'PENDING'
      };

      WeekendPosition.create(weekendPosition, function (weekendPosition) {
        $uibModalInstance.close(weekendPosition);
      });
      
    };

    $scope.loadPositions();
    $scope.loadPeople();

    $scope.$watch('selected.personId', $scope.loadPeopleWeekendPositions);

  }]);
