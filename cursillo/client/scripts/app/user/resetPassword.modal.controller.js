angular.module('app')
  .controller('ResetPasswordModalController', ['$scope', 'Account', 'Notification', '$uibModalInstance', 'accountId', function ($scope, Account, Notification, $uibModalInstance, accountId) {
    
    $scope.accountId = accountId;
    
    $scope.account = {
      accountId: accountId
    };
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.updatePassword = function () {
      Account.update({id: accountId}, $scope.account, function () {
        $uibModalInstance.close();
      }, function () {
        Notification.error('Error updating password');
      });
    };
    

  }]);
