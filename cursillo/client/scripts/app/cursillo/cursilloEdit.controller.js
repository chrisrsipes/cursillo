angular.module('app').controller('CursilloEditController', ['$scope', 'Cursillo', '$stateParams', '$state', function ($scope, Cursillo, $stateParams, $state) {

  $scope.cursillo;
  $scope.cursilloId = $stateParams.id;
  $scope.edit = !!$scope.cursilloId;

  $scope.createCursillo = function () {
    Cursillo.create($scope.cursillo, function (res) {
      $state.go('cursillo.detail', {id: res.id});
    });

  };

  $scope.loadCursillo = function () {
    Cursillo.get({id: $scope.cursilloId}, function (res) {
      $scope.cursillo = res;
    });
  };

  $scope.updateCursillo = function () {
    Cursillo.update({id: $scope.cursilloId}, $scope.cursillo, function (cursillo) {
      $state.go('cursillo.detail', {id: $scope.cursilloId});
    });
  };

  if ($scope.edit) {
    $scope.loadCursillo();
  }

}]);
