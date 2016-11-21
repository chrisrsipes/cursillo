angular.module('app').controller('ParishListController', ['$scope', 'Parish', 'Cursillo', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Parish, Cursillo, DTOptionsBuilder, DTColumnBuilder) {
  $scope.parishes = [];
  $scope.cursillos = [];
  
  $scope.selected = {
    cursilloId: null
  };

  $scope.options = DTOptionsBuilder.newOptions().withDisplayLength(10);
  $scope.columnDefs = [
    DTColumnBuilder.newColumnDef(0),
    DTColumnBuilder.newColumnDef(1),
    DTColumnBuilder.newColumnDef(2)
  ];


  $scope.deleteParish = function (parishId, index) {
    /*
    Parish.delete({id: parishId}, function (response) {
    });
    */


    $scope.parishes.splice(index, 1);
    
    
  };
  
  $scope.loadParishes = function () {
    
    if ($scope.selected.cursilloId) {
      Cursillo.getParishes({id: $scope.selected.cursilloId}, function (parishes) {
        $scope.parishes = parishes;
      });
    }
    else {
      Parish.query(function (parishes) {
        $scope.parishes = parishes;
      });
    }


  };
  
  $scope.loadCursillos = function () {
    Cursillo.query(function (cursillos) {
      $scope.cursillos = cursillos;
    });
  };
  
  $scope.resetFilter = function () {
    $scope.selected.cursilloId = null;
    $scope.loadParishes();
  };
  
  $scope.loadParishes();
  $scope.loadCursillos();
  
}]);
