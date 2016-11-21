<<<<<<< HEAD
/**
 * Created by deneshtotaram on 11/20/16.
 */
angular.module('app').controller('CursilloDetailController', ['$scope', 'Position', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, Position, DTOptionsBuilder, DTColumnBuilder) {


=======
angular.module('app').controller('CursilloDetailController', ['$scope', 'Cursillo', '$stateParams', function ($scope, Cursillo, $stateParams) {
  
  $scope.cursillo;
  $scope.cursilloId = $stateParams.id;
  
  
  $scope.loadCursillo = function () {
    Cursillo.get({id: $scope.cursilloId}, function (cursillo) {
      $scope.cursillo = cursillo;
    });
  };

  $scope.loadCursillo();
  
>>>>>>> christopher-branch
}]);
