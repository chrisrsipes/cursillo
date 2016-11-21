angular.module('app').controller('CursilloListController', ['$scope', 'Cursillo', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Cursillo, DTOptionsBuilder, DTColumnBuilder) {
  $scope.cursillos = [];

  
  $scope.options = DTOptionsBuilder.newOptions().withDisplayLength(10);
  $scope.columnDefs = [
    DTColumnBuilder.newColumnDef(0),
    DTColumnBuilder.newColumnDef(1),
    DTColumnBuilder.newColumnDef(2)
  ];


  $scope.deleteCursillo = function (cursilloId, index) {
    /*
    Cursillo.delete({id: cursilloId}, function (response) {
    });
    */


    $scope.cursillos.splice(index, 1);
    
    
  };
  
  $scope.loadCursillos = function () {

    Cursillo.query(function (cursillos) {
      $scope.cursillos = cursillos;
    });

  };
  
  $scope.loadCursillos();
  
}]);
