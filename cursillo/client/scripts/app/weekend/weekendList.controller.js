angular.module('app').controller('WeekendListController', ['$scope', 'Weekend', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Weekend, DTOptionsBuilder, DTColumnBuilder) {
  $scope.weekends = [];


  $scope.options = DTOptionsBuilder.newOptions().withDisplayLength(10);
  $scope.columnDefs = [
    DTColumnBuilder.newColumnDef(0),
    DTColumnBuilder.newColumnDef(1),
    DTColumnBuilder.newColumnDef(2)
  ];


  $scope.deleteWeekend = function (weekendId, index) {
     Weekend.delete({id: weekendId}, function (response) {
       $scope.weekends.splice(index, 1);
     });
  };

  $scope.loadWeekends = function () {

    Weekend.query(function (weekends) {
      console.log('weekends', weekends);
      $scope.weekends = weekends;
    });

  };

  $scope.loadWeekends();

}]);
