angular.module('app').factory('TalkLink', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/talkLinks/:id'), null, {
      'query': {
        method: 'GET',
        url: getPath('/talkLinks'),
        isArray: true
      },
      'create': {
        method: 'POST',
        url: getPath('/talkLinks')
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
