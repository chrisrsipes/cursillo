angular.module('app').controller('PersonListController', ['$scope', 'Person', function ($scope, Person)  {

  $scope.people = [];

  $scope.deletePerson = function (personId, index) {

    Person.delete({id: personId}, function (response) {
      $scope.people.splice(index, 1);
    });

  };

  $scope.loadPeople = function () {

    Person.query(function (people) {
      $scope.people = people;
    });

  };

  $scope.loadPeople();

}]);
