angular.module('app').controller('PositionListController', ['$scope', 'Position', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Position, DTOptionsBuilder, DTColumnBuilder) {
  
  $scope.positions = [];
  
  $scope.deletePosition = function (positionId, index) {
    
    Position.delete({id: positionId}, function (response) {
      $scope.positions.splice(index, 1);
    });

  };
  
  $scope.loadPositions = function () {

    Position.query(function (positions) {
      $scope.positions = positions;
    });

  };
  
  $scope.loadPositions();
  
}]);
