angular.module('app').config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push(function ($timeout, $q, $injector, $rootScope) {
    var loginModal, $http, $state, Notification;

    $timeout(function () {
      loginModal = $injector.get('loginModal');
      $http = $injector.get('$http');
      $state = $injector.get('$state');
      Notification = $injector.get('Notification');
    });

    return {
      responseError: function (rejection) {
        var deferred = $q.defer();

        // unauthorized request, not authorized user
        if (rejection.status === 401 && !$rootScope.currentUser) {
          var message = rejection && rejection.message;
          var loginError = message && message.indexOf('login failed') !== -1;
          
          if (loginError) {
            Notification.error('Login failed');
            deferred.reject(rejection);
          }
          else {
            Notification.error(message);
            deferred.reject(rejection);
          }
        }
        else if (rejection.status === 422) {
          Notification.error(rejection && rejection.message);
          deferred.reject(rejection);
        }
        else {
          return rejection;
        }

        return deferred.promise;
      }
    };
  });
}]);
