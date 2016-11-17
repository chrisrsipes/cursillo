angular.module('app').controller('PositionDetailController', ['$scope', 'Position', '$stateParams', function ($scope, Position, $stateParams) {
  
  $scope.position;
  $scope.positionId = $stateParams.id;
  
  
  $scope.loadPosition = function () {
    Position.get({id: $scope.positionId}, function (position) {
      $scope.position = position;
    });
  };

  $scope.loadPosition();
  
}]);
