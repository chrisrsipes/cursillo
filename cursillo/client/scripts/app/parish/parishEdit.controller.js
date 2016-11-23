angular.module('app').controller('ParishEditController', ['$scope', 'Parish', 'Cursillo', '$stateParams', '$state', function ($scope, Parish, Cursillo, $stateParams, $state) {

  $scope.parish;
  $scope.parishId = $stateParams.id;
  $scope.edit = !!$scope.parishId;
  
  $scope.cursillos = [];

  $scope.createParish = function () {
    Parish.create($scope.parish, function (res) {
      $state.go('parish.detail', {id: res.id});
    });

  };

  $scope.loadParish = function () {
    Parish.get({id: $scope.parishId}, function (res) {
      $scope.parish = res;
    });
  };

  $scope.updateParish = function () {
    Parish.update({id: $scope.parishId}, $scope.parish, function (parish) {
      $state.go('parish.detail', {id: $scope.parishId});
    });
  };
  
  $scope.loadCursillos = function () {
    Cursillo.query(function (cursillos) {
      $scope.cursillos = cursillos;
    });
  };

  $scope.loadCursillos();
  
  if ($scope.edit) {
    $scope.loadParish();
  }

}]);
