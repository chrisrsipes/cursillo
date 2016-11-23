angular.module('app').controller('ParishDetailController', ['$scope', 'Parish', 'Cursillo', '$stateParams', function ($scope, Parish, Cursillo, $stateParams) {
  
  $scope.parish;
  $scope.parishId = $stateParams.id;
  $scope.selectedCursillo;
  
  
  $scope.loadParish = function () {
    Parish.get({id: $scope.parishId}, function (parish) {
      $scope.parish = parish;
      
      Cursillo.get({id: parish.cursilloId}, function (cursillo) {
        $scope.selectedCursillo = cursillo;
      });
    });
  };
  
  $scope.loadParish();
  
}]);
