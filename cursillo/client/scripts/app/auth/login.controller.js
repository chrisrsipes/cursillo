angular.module('app').controller('LoginController', ['$scope', '$rootScope', '$state', 'Session', 'Account', 'Notification', function ($scope, $rootScope, $state, Session, Account, Notification) {
 
  if ($rootScope.currentUser) {
    $state.go('dashboard');
  }
  else {
    Session.isStoredLocally().then(function (session) {
      if (session) {
        $state.go('dashboard');
      }
    });
  }
  
  var generateCredentials = function () {
    return {
      email: '',
      password: ''
    };
  };
  
  $scope.credentials = generateCredentials();
  
  $scope.authenticate = function (credentials) {
    var success = function () {
      $state.go('dashboard');
    };

    if (!credentials || !credentials.email || !credentials.password) {
      // @TODO: add form errors
      return;
    }
    else {
      
      Account.login(credentials, function (session) {
        if (!session.id && $rootScope.currentUser) {
          success();
          return;
        }
        
        if (!session.id) {
          Notification.error('Invalid email address or password.');
          return;
        }

        var user = session.user;

        Session.create(session.id, session.user.id, session.userRoles || []);
        Notification.success(['Welcome, ', user.firstName, ' ',  user.lastName, '.'].join(''));
        success();

      }, function () {
        Notification.error('Invalid email address or password.');
      });
      
    }

  };

}]);
