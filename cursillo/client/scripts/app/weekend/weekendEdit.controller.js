angular.module('app').controller('WeekendEditController', ['$scope', 'Weekend', 'Location', '$stateParams', '$state', function ($scope, Weekend, Location, $stateParams, $state) {

  $scope.weekend;
  $scope.weekendId = $stateParams.id;
  $scope.edit = !!$scope.weekendId;

  $scope.selected = {
    locationId: null
  };

  var locationPromise, weekendPromise;

  $scope.locations = [];

  $scope.createWeekend = function () {
    Weekend.create($scope.weekend, function (res) {
      $state.go('weekend.detail', {id: res.id});
    });
  };

  $scope.loadWeekend = function () {
    Weekend.get({id: $scope.weekendId}, function (res) {
      console.log('weekend', res);
      $scope.weekend = res;
    });
  };

  $scope.updateWeekend = function () {
    Weekend.update({id: $scope.weekendId}, $scope.weekend, function (weekend) {
      $state.go('weekend.detail', {id: $scope.weekendId});
    });
  };

  $scope.loadLocations = function () {
    Location.query(function (locations) {
      $scope.locations = locations;
    });
  };

  if ($scope.edit) {
    $scope.loadWeekend();
  }

  $scope.loadLocations();

}]);
