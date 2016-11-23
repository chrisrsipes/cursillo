angular.module('app').factory('WeekendPosition', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/weekendPositions/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/weekendPositions'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/weekendPositions')
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
        url: getPath('/weekendPositions/:id/talkLinks'),
        isArray: true
      }
    });

}]);
