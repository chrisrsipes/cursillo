angular.module('app').controller('ReportingWeekendController', ['$scope', 'Account', function ($scope, Account) {

  $scope.accounts = [];

  var account = $scope.accounts[0];

  Account.query(function (response) {
    $scope.accounts = response.accounts;
  });


}]);
