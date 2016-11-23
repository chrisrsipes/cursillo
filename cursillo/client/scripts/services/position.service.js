angular.module('app').factory('Position', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/positions/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/positions'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/positions')
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
        url: getPath('/positions/:id/people'),
        isArray: true
      }
    });

}]);
