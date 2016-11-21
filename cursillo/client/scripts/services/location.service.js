angular.module('app').factory('Location', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/locations/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/locations'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/locations')
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
