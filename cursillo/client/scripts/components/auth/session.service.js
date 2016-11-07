angular.module('app').service('Session', ['localStorageService', '$rootScope', 'Account', '$q', function (localStorageService, $rootScope, Account, $q) {
  this.create = function (sessionId, userId, userRoles) {
    this.id = sessionId;
    this.userId = userId;
    this.userRoles = userRoles;

    var sessionObj = {
      id: this.id,
      userId: this.userId,
      userRoles: angular.isArray(this.userRoles) ? this.userRoles : [this.userRoles]
    };

    localStorageService.set('session', angular.toJson(sessionObj));
  };

  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRoles = [];

    localStorageService.remove('session');
  };

  // @TODO: validate against the server
  this.isValidSessionObject = function (session) {
    var validLocalSession = (session && session.userId && session.id && session.userRoles);

    return $q(function (resolve, reject) {
      resolve(validLocalSession);
    });
  };

  this.isStoredLocally = function () {
    var session = angular.fromJson(localStorageService.get('session'));
    var sessionObj = this;

    // validates the location session, then gets and sets the current user for it, and indicates it was successful.
    // if there is no valid local session, then it instead indicates that it was unsuccessful
    return this.isValidSessionObject(session).then(function (isValidLocalSession) {
      if (isValidLocalSession) {


        // ResourceDefaults.addHeader('Authorization', session.id);

        return $q(function (resolve, reject) {
          if (session.user) {
            $rootScope.currentUser = session.user;
            sessionObj.create(session.id, session.user.id, session.userRoles || []);
            resolve(true);
          }
          else {

            Account.get({id: session.userId}, function (account) {
              $rootScope.currentUser = account;
              sessionObj.create(session.id, account.id, account.userRoles || []);
              resolve(true);
            });

          }
        });
      }
      else {
        return $q(function (resolve, reject) {resolve(false);});
      }
    });
  };

}]);
