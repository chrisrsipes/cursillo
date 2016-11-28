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
      },
      'getWeekendPositions': {
        method: 'GET',
        url: getPath('/people/:id/weekendPositions'),
        isArray: true
      },
      'getApplication': {
        method: 'GET',
        url: getPath('/people/:id/application'),
        transformResponse: function (response) {
          var booleanFields = ['isCatholic', 'isConverted', 'requestLowerBunk', 'receivesEucharist'];
          
          var transformedResponse = angular.fromJson(response);
          
          angular.forEach(booleanFields, function (field) {
            if (transformedResponse[field] == 1) {
              transformedResponse[field] = true;
            }
            else {
              transformedResponse[field] = false;
            }
          });
          
          return transformedResponse;
        }
      }
    });

}]);
