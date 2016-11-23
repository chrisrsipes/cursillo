angular.module('app').factory('Person', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/people/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/people'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/people')
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
      'getTalkLinks': {
        method: 'GET',
        url: getPath('/people/:id/talkLinks'),
        isArray: true
      }
    });

}]);
