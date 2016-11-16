angular.module('app')
  .controller('LoginModalController', ['$rootScope', '$scope', '$state', '$uibModalInstance', 'Account', 'Session', 'Notification', function ($rootScope, $scope, $state, $uibModalInstance, Account, Session, Notification) {
    
    $scope.credentials = {
      email: '',
      password: ''
    };
    
    $scope.ok = function (response) {
      $uibModalInstance.close(response);
    };
    
    // @TODO: make this go back one state instead of to login
    $scope.cancel = function () {
      $state.go('login');
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.login = function (credentials) {

      if (!credentials || !credentials.email || !credentials.password) {
        // @TODO: add form error
      }
      else {

          Account.login(credentials, function (session) {
              if (session.error && $rootScope.currentUser) {
                  $scope.ok($rootScope.currentUser);
                  return;
              }

              var user = session.account;

              Session.create(session.accessToken.id, session.account.id, session.userRoles || []);
              Notification.success(['Welcome, ', user.firstName, ' ',  user.lastName, '.'].join(''));
              $scope.ok(user);
          }, function (err) {
              throw err;

          });
      }

    };


  }]);
