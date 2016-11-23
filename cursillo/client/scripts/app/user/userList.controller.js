angular.module('app').controller('UserListController', ['$scope', 'Account', function ($scope, Account)  {

  $scope.accounts = [];

  $scope.deleteAccount = function (accountId, index) {

    Account.delete({id: accountId}, function (response) {
      $scope.accounts.splice(index, 1);
    });

  };

  $scope.loadAccounts = function () {

    Account.query(function (accounts) {
      $scope.accounts = accounts;
    });

  };

  $scope.loadAccounts();

}]);
