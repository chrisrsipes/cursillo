angular.module('app').factory('Cursillo', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/cursillos/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/cursillos'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/cursillos')
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
      'getLocations': {
        url: getPath('/cursillos/:id/locations'),
        method: 'GET',
        isArray: true
      },
      'getParishes': {
        url: getPath('/cursillos/:id/parishes'),
        method: 'GET',
        isArray: true
      }
    });

}]);
