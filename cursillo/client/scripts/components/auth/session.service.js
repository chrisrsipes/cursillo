angular.module('app').service('Session', ['localStorageService', '$rootScope', 'Account', '$q', function (localStorageService, $rootScope, Account, $q) {
  this.create = function (sessionId, userId, roles) {
    this.id = sessionId;
    this.userId = userId;
    this.roles = roles;

    var sessionObj = {
      id: this.id,
      userId: this.userId,
      roles: angular.isArray(this.roles) ? this.roles : [this.roles]
    };

    localStorageService.set('session', angular.toJson(sessionObj));
  };

  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.roles = [];

    localStorageService.remove('session');
  };

  // @TODO: validate against the server
  this.isValidSessionObject = function (session) {
    var validLocalSession = (session && session.userId && session.id && session.roles);

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
            sessionObj.create(session.id, session.user.id, session.roles || []);
            resolve(true);
          }
          else {

            Account.get({id: session.userId}, function (account) {
              $rootScope.currentUser = account;
              sessionObj.create(session.id, account.id, account.roles);
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
