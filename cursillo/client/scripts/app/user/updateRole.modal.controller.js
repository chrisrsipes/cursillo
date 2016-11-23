angular.module('app')
  .controller('UpdateRoleModalController', ['$scope', 'Account', 'Role', 'Notification', '$uibModalInstance', 'accountId', function ($scope, Account, Role, Notification, $uibModalInstance, accountId) {
    
    $scope.accountId = accountId;
    
    $scope.roleMapping = {
      principalId: accountId
    };
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.updateRole = function () {
      Account.updateRole({id: accountId}, $scope.roleMapping, function () {
        $uibModalInstance.close();
      }, function () {
        Notification.error('Error updating role.');
      });
    };
    
    $scope.loadRoles = function () {
      Role.query(function (roles) {
        $scope.roles = roles;
      });
    };
    
    $scope.loadRoles();

  }]);
