angular.module('app').controller('PositionListController', ['$scope', 'Position', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Position, DTOptionsBuilder, DTColumnBuilder) {
  $scope.positions = [];

  
  $scope.options = DTOptionsBuilder.newOptions().withDisplayLength(10);
  $scope.columnDefs = [
    DTColumnBuilder.newColumnDef(0),
    DTColumnBuilder.newColumnDef(1),
    DTColumnBuilder.newColumnDef(2)
  ];


  $scope.deletePosition = function (positionId, index) {
    /*
    Position.delete({id: positionId}, function (response) {
    });
    */


    $scope.positions.splice(index, 1);
    
    
  };
  
  $scope.loadPositions = function () {

    Position.query(function (positions) {
      $scope.positions = positions;
    });

  };
  
  $scope.loadPositions();
  
}]);
