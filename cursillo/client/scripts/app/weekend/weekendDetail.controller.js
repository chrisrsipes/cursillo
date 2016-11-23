/**
 * Created by deneshtotaram on 11/20/16.
 */
angular.module('app').controller('WeekendDetailController', ['$scope', 'Weekend', '$stateParams', function ($scope, Weekend, $stateParams) {

  $scope.weekend;
  $scope.weekendId = $stateParams.id;


  $scope.loadWeekend = function () {
    Weekend.get({id: $scope.weekendId}, function (weekend) {
      console.log('weekend', weekend);
      $scope.weekend = weekend;
    });
  };

  $scope.loadWeekend();

}]);

