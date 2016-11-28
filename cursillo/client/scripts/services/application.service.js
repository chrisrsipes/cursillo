angular.module('app').factory('Application', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/applications/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/applications'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/applications')
      },
      'get': {
        method:'GET'
      },
      'update': {
        method:'PUT'
      },
      'delete': {
        method:'DELETE'
      }

    });

}]);
