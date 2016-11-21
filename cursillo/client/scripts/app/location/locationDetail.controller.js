angular.module('app').controller('LocationDetailController', ['$scope', 'Location', 'Cursillo', '$stateParams', function ($scope, Location, Cursillo, $stateParams) {
  
  $scope.location;
  $scope.locationId = $stateParams.id;
  $scope.selectedCursillo;
  
  
  $scope.loadLocation = function () {
    Location.get({id: $scope.locationId}, function (location) {
      $scope.location = location;
      
      Cursillo.get({id: location.cursilloId}, function (cursillo) {
        $scope.selectedCursillo = cursillo;
      });
    });
  };
  
  $scope.loadLocation();
  
}]);
