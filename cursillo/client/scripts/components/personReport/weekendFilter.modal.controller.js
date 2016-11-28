angular.module('app')
  .controller('WeekendFilterModalController', ['$scope', 'Weekend', '$uibModalInstance', 'gender', 'selectedWeekendIds', function ($scope, Weekend, $uibModalInstance, gender, selectedWeekendIds) {
    
    $scope.weekendInfo = {};
    $scope.weekends = [];
    $scope.selectedWeekends = selectedWeekendIds || [];
    
    $scope.gender = gender;
    
    $scope.filter = {
      count: 1
    };
    
    $scope.selected = {
      weekendId: null
    };
    
    $scope.selectPastWeekends = function () {
      Weekend.findPastByGender({gender: $scope.gender, count: $scope.filter.count}, function (weekends) {
        $scope.selectedWeekends = [];
        
        for (var i = 0; i < weekends.length; i++) {
          $scope.selectedWeekends.push(weekends[i].id); 
        }
      });
    };
    
    $scope.loadWeekends = function () {
      
      Weekend.query(function (weekends) {
        $scope.weekends = weekends;
        
        angular.forEach(weekends, function (weekend) {
          $scope.weekendInfo[weekend.id] = weekend;
        });
      });
    };
    
    $scope.removeWeekend = function (ind) {
      $scope.selectedWeekends.splice(ind, 1);
    };
    
    var elementIsUnique = function (array, elem) {
      
      for (var i = 0; i < array.length; i++)
        if (array[i] === elem)
          return false;
      
      return true;
    };
    
    $scope.addWeekend = function () {
      if ($scope.selected.weekendId && elementIsUnique($scope.selectedWeekends, $scope.selected.weekendId)) {
        $scope.selectedWeekends.push($scope.selected.weekendId);
      }
    };
    
    $scope.close = function () {
      $uibModalInstance.close($scope.selectedWeekends);
    };
    
    $scope.loadWeekends();

  }]);
