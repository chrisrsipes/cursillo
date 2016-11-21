angular.module('app').controller('PositionEditController', ['$scope', 'Position', '$stateParams', '$state', function ($scope, Position, $stateParams, $state) {

  $scope.position;
  $scope.positionId = $stateParams.id;
  $scope.edit = !!$scope.positionId;

  $scope.createPosition = function () {
    Position.create($scope.position, function (res) {
      $state.go('position.detail', {id: res.id});
    });

  };

  $scope.loadPosition = function () {
    Position.get({id: $scope.positionId}, function (res) {
      $scope.position = res;
    });
  };

  $scope.updatePosition = function () {
    Position.update({id: $scope.positionId}, $scope.position, function (position) {
      $state.go('position.detail', {id: $scope.positionId});
    });
  };

  if ($scope.edit) {
    $scope.loadPosition();
  }

}]);
