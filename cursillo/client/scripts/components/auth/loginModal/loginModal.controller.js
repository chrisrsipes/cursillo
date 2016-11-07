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

          // @TODO: fix this after authentication endpoint works
          var user = {
              firstName: 'John',
              lastName: 'Doe',
              username: 'john.doe',
              email: 'johndoe@host.com',
              created: new Date(),
              lastUpdated: new Date(),
              id: 1
          };

          Session.create(1, user.id, ['ROLES_USER']);
          Notification.success(['Welcome, ', user.firstName, ' ',  user.lastName, '.'].join(''));
          $scope.ok(user);

          return;

          Account.login(credentials, function (session) {
              // @TODO: figure out why login is being called a second time from somewhere else after
              // at least one unsuccessful login
              if (session.error && $rootScope.currentUser) {
                  $scope.ok($rootScope.currentUser);
                  return;
              }

              var user = session.user;

              console.log('session', session);
              Session.create(session.id, session.user.id, session.userRoles || []);
              Notification.success(['Welcome, ', user.firstName, ' ',  user.lastName, '.'].join(''));
              $scope.ok(user);
          }, function (err) {
              debugger;

              err;
          });
      }

    };


  }]);
