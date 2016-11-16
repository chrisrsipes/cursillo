angular.module('app').factory('Account', ['$resource', '$location', function($resource, $location) {
    var base = [$location.protocol(), '://', $location.host(), ':', $location.port(), '/api'].join('');

    var getPath = function (trail) {
        return base + trail;
    };

    return $resource(getPath('/accounts/:id'), null, {
        'query': {method: 'GET', url: getPath('/accounts')},
        'get': { method:'GET' },
        'create': { method:'POST', url: getPath('/accounts') },
        'login': { method: 'POST', url: getPath('/accounts/login') }
    });
}]);
