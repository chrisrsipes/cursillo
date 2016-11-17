angular.module('app').service('Principal', ['localStorageService', '$rootScope', 'Session', '$q', function (localStorageService, $rootScope, Session, $q) {

  var self = this;

  self.identity = function () {
    var deferred = $q.defer();


    // if currentUser isn't already available (such as on page refresh where we
    // have to fetch account from access token, wait till value of currentUser changes
    // and then do the callback
    if (!$rootScope.currentUser || !$rootScope.currentUser.id) {

      var unwatch = $rootScope.$watch('currentUser', function (newVal, oldVal) {

        // unwatch stops watching this object in the scope.
        unwatch();

        deferred.resolve(newVal);

      });

    }
    // this captures cases like regular state transitions when current user it set
    else {

      deferred.resolve($rootScope.currentUser);

    }

    return deferred.promise;
  };

  self.isInRole = function (role, roleList) {
    roleList = roleList || Session.roles;

    for (var i = 0; i < roleList.length; i++)
      if (roleList[i] === role)
        return true;

    return false;
  };

  self.isInAnyRole = function (requiredRoles, userRoles) {
    userRoles = userRoles || Session.roles;

    for (var i = 0; i < requiredRoles.length; i++)
      if (self.isInRole(requiredRoles[i], userRoles))
        return true;

    return false;
  };

}]);
