angular.module('app').controller('TalkListController', ['$scope', 'Talk', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Talk, DTOptionsBuilder, DTColumnBuilder) {
  $scope.talks = [];

  
  $scope.options = DTOptionsBuilder.newOptions().withDisplayLength(10);
  $scope.columnDefs = [
    DTColumnBuilder.newColumnDef(0),
    DTColumnBuilder.newColumnDef(1),
    DTColumnBuilder.newColumnDef(2)
  ];


  $scope.deleteTalk = function (talkId, index) {
    /*
    Talk.delete({id: talkId}, function (response) {
    });
    */


    $scope.talks.splice(index, 1);
    
    
  };
  
  $scope.loadTalks = function () {

    Talk.query(function (talks) {
      $scope.talks = talks;
    });

  };
  
  $scope.loadTalks();
  
}]);
