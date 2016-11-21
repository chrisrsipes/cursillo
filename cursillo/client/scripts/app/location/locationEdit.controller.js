angular.module('app').controller('LocationEditController', ['$scope', 'Location', '$stateParams', '$state', function ($scope, Location, $stateParams, $state) {

  $scope.location;
  $scope.locationId = $stateParams.id;
  $scope.edit = !!$scope.locationId;

  $scope.createLocation = function () {
    Location.create($scope.location, function (res) {
      $state.go('location.detail', {id: res.id});
    });

  };

  $scope.loadLocation = function () {
    Location.get({id: $scope.locationId}, function (res) {
      $scope.location = res;
    });
  };

  $scope.updateLocation = function () {
    Location.update({id: $scope.locationId}, $scope.location, function (location) {
      $state.go('location.detail', {id: $scope.locationId});
    });
  };

  if ($scope.edit) {
    $scope.loadLocation();
  }

}]);
