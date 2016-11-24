angular.module('app').controller('UserDetailController', ['$scope', 'Account', 'Notification', '$stateParams', '$uibModal', function ($scope, Account, Notification, $stateParams, $uibModal) {

  $scope.account;
  $scope.accountId = $stateParams.id;


  $scope.loadAccount = function () {
    Account.get({id: $scope.accountId}, function (account) {
      $scope.account = account;
    });
  };

  $scope.resetPassword = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      templateUrl: 'scripts/app/user/resetPassword.modal.template.html',
      controller: 'ResetPasswordModalController',
      resolve: {
        accountId: function () {
          return $scope.accountId;
        }
      }
    });

    modalInstance.result.then(function () {
      Notification.success('Password set.');
      $scope.loadAccount();
    });

  };
  
  $scope.updateRole = function () {
    
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      templateUrl: 'scripts/app/user/updateRole.modal.template.html',
      controller: 'UpdateRoleModalController',
      resolve: {
        accountId: function () {
          return $scope.accountId;
        }
      }
    });

    modalInstance.result.then(function () {
      Notification.success('Role successfully updated.');
      $scope.loadAccount();
    });
    
  };

  $scope.loadAccount();

}]);
