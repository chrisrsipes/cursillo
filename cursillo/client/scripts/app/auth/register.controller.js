angular.module('app').controller('RegisterController', ['$scope', '$rootScope', 'Session', 'Account', 'Notification', '$state', function ($scope, $rootScope, Session, Account, Notification, $state) {
  
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
  

  var generateAccount = function () {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  };

  $scope.account = generateAccount();

  $scope.createAccount = function () {
    // validate info

    Account.create($scope.account, function (res) {
      console.log('res', res);
      Notification.success('Successfully created account!');
      $state.go('login');
    }, function () {
      Notification.error('There was an error creating the account');
    });
  };

}]);
