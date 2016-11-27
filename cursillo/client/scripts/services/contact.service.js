angular.module('app').factory('Contact', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/contacts/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/contacts'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/contacts')
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
