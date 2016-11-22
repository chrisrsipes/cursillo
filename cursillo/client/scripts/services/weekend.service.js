angular.module('app').factory('Weekend', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/weekends/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/weekends'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/weekends')
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
        url: getPath('/weekends/:id/talkLinks'),
        isArray: true
      }
    });

}]);
