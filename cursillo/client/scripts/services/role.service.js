angular.module('app').factory('Role', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/roles/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/roles'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/roles')
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
      'getPeople': {
        method: 'GET',
        url: getPath('/roles/:id/people'),
        isArray: true
      }
      
    });

}]);
