angular.module('app').controller('LocationListController', ['$scope', 'Location', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Location, DTOptionsBuilder, DTColumnBuilder) {
  $scope.locations = [];

  
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

    Location.query(function (locations) {
      $scope.locations = locations;
    });

  };
  
  $scope.loadLocations();
  
}]);
