angular.module('app').controller('CursilloDetailController', ['$scope', 'Cursillo', '$stateParams', function ($scope, Cursillo, $stateParams) {
  
  $scope.cursillo;
  $scope.cursilloId = $stateParams.id;
  
  
  $scope.loadCursillo = function () {
    Cursillo.get({id: $scope.cursilloId}, function (cursillo) {
      $scope.cursillo = cursillo;
    });
  };

  $scope.loadCursillo();
  
}]);
