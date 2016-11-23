angular.module('app').controller('UserEditController', ['$scope', 'Account', 'Role', '$stateParams', '$state', function ($scope, Account, Role, $stateParams, $state) {

  $scope.account;
  $scope.accountId = $stateParams.id;
  $scope.edit = !!$scope.accountId;
  
  $scope.roles = [];

  $scope.loadAccount = function () {
    Account.get({id: $scope.accountId}, function (res) {
      console.log('account', res);
      $scope.account = res;
    });
  };

  $scope.loadRoles = function () {
    Role.query(function (roles) {
      $scope.roles = roles;
    });
  };
  
  $scope.createAccount = function () {
    Account.create($scope.account, function (res) {
      $state.go('user.detail', {id: res.id});
    });
  };

  $scope.updateAccount = function () {
    Account.update({id: $scope.accountId}, $scope.account, function (account) {
      console.log('account', account);
      $state.go('user.detail', {id: $scope.accountId});
    });
  };

  if ($scope.edit) {
    $scope.loadAccount();
  }
  
  $scope.loadRoles();

}]);
