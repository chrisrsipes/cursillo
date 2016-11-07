angular.module('app').service('loginModal', function ($uibModal, $rootScope) {
  var assignCurrentUser = function (user) {
    $rootScope.currentUser = user;
    return user;
  };

  return function () {
    var instance = $uibModal.open({
      animation: true,
      size: 'md',
      controller: 'LoginModalController',
      templateUrl: 'scripts/components/auth/loginModal/login.modal.template.html'
    });

    return instance.result.then(assignCurrentUser);
  };
});
