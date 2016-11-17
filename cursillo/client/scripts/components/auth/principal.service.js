angular.module('app').service('Principal', ['localStorageService', '$rootScope', 'Account', '$q', function (localStorageService, $rootScope, Account, $q) {
  
  var self = this;
  
  self.isInRole = function (role, roleList) {
    for (var i = 0; i < roleList.length; i++)
      if (roleList[i] === role)
        return true;
    
    return false;
  };
  
  self.isInAnyRole = function (requiredRoles, userRoles) {
    for (var i = 0; i < requiredRoles.length; i++)
      if (self.isInRole(requiredRoles[i], userRoles))
        return true;
    
    return false;
  };
  
}]);
