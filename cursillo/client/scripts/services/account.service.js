angular.module('app').factory('Account', ['$resource', '$location', function($resource, $location) {
  var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

  var getPath = function (trail) {
    return base + trail;
  };

  return $resource(getPath('/accounts/:id'), null, {
    'query': {
      method: 'GET',
      url: getPath('/accounts'),
      isArray: true
    },
    'create': {
      method:'POST',
      url: getPath('/accounts')
    },
    'get': {
      method:'GET'
    },
    'update': {
      method:'PUT'
    },
    'delete': {
      method:'DELETE'
    },
    'login': {
      method: 'POST',
      url: getPath('/accounts/login')
    },
    'logout': {
      method: 'GET',
      url: getPath('/accounts/logout')
    },
    'authenticated': {
      method: 'GET',
      url: getPath('/accounts/authenticated')
    },
    'updateRole': {
      'method': 'POST',
      url: getPath('/accounts/:id/roles')
    }
  });

}]);
