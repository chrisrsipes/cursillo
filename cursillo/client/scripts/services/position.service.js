angular.module('app').factory('Position', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/positions/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/positions')
      },
      'get': {
        method:'GET'
      },
      'create': {
        method: 'POST',
        url: getPath('/positions')
      }
    });

}]);
