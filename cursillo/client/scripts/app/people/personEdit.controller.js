angular.module('app').controller('PersonEditController', ['$scope', 'Person', 'Role', '$stateParams', '$state', function ($scope, Person, Role, $stateParams, $state) {

  $scope.person;
  $scope.personId = $stateParams.id;
  
  $scope.roles = [];

  $scope.loadPerson = function () {
    Person.get({id: $scope.personId}, function (res) {
      $scope.person = res;
    });
  };

  $scope.updatePerson = function () {
    Person.update({id: $scope.personId}, $scope.person, function (person) {
      console.log('person', person);
      $state.go('people.detail', {id: $scope.personId});
    });
  };

  $scope.loadPerson();
  

}]);
