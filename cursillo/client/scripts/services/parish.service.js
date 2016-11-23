angular.module('app').factory('Parish', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/parishes/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/parishes'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/parishes')
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
