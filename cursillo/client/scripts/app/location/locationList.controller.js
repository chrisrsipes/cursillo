angular.module('app').controller('LocationListController', ['$scope', 'Location', 'Cursillo', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Location, Cursillo, DTOptionsBuilder, DTColumnBuilder) {
  $scope.locations = [];
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


  $scope.deleteLocation = function (locationId, index) {
    /*
    Location.delete({id: locationId}, function (response) {
    });
    */


    $scope.locations.splice(index, 1);
    
    
  };
  
  $scope.loadLocations = function () {
    
    if ($scope.selected.cursilloId) {
      Cursillo.getLocations({id: $scope.selected.cursilloId}, function (locations) {
        $scope.locations = locations;
      });
    }
    else {
      Location.query(function (locations) {
        $scope.locations = locations;
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
    $scope.loadLocations();
  };
  
  $scope.loadLocations();
  $scope.loadCursillos();
  
}]);
