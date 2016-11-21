angular.module('app').controller('LocationDetailController', ['$scope', 'Location', '$stateParams', function ($scope, Location, $stateParams) {
  
  $scope.location;
  $scope.locationId = $stateParams.id;
  
  
  $scope.loadLocation = function () {
    Location.get({id: $scope.locationId}, function (location) {
      $scope.location = location;
    });
  };

  $scope.loadLocation();
  
}]);
