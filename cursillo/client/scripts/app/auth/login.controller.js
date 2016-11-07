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
      success();


      /*
       Account.login(credentials, function (session) {
       // @TODO: figure out why login is being called a second time from somewhere else after
       // at least one unsuccessful login, this condiiton is to get around that
       if (session.error && $rootScope.currentUser) {
       success();
       return;
       }

       var user = session.user;

       Session.create(session.id, session.user.id, session.userRoles || []);
       Notification.success(['Welcome, ', user.firstName, ' ',  user.lastName, '.'].join(''));
       success();

       }, function () {
       Notification.error('Invalid email address or password.');
       });
       */
    }

  };

}]);
