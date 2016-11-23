angular.module('app').factory('Team', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/teams/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/teams'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/teams')
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
      'getWeekendPositions': {
        method: 'GET',
        url: getPath('/teams/:id/weekendPositions'),
        isArray: true
      },
      'deleteWeekendPositions': {
        method: 'delete',
        url: getPath('/teams/:id/weekendPositions')
      }
      
    });

}]);
