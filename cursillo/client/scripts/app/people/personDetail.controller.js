angular.module('app').controller('PersonDetailController', ['$scope', 'Person', 'Role', '$stateParams', '$state', function ($scope, Person, Role, $stateParams, $state) {

  $scope.person;
  $scope.personId = $stateParams.id;
  
  $scope.loadPerson = function () {
    Person.get({id: $scope.personId}, function (res) {
      $scope.person = res;
    });
  };

  $scope.loadPerson();
  

}]);
