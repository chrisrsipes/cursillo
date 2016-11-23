angular.module('app').factory('Talk', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/talks/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/talks'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/talks')
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
        url: getPath('/talks/:id/people'),
        isArray: true
      }
      
    });

}]);
