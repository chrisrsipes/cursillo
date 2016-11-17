angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: '/scripts/app/auth/login.html',
      controller: 'LoginController',
      data: {
        requireLogin: false,
        roles: []
      }
    })
    
    .state('logout', {
      url: '/logout',
      template: '<ui-view />',
      controller: ['$rootScope', '$state', 'Session', function ($rootScope, $state, Session) {
        $rootScope.currentUser = undefined;
        Session.destroy();
        
        $state.go('login');
      }],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

    .state('register', {
      url: '/register',
      templateUrl: '/scripts/app/auth/register.html',
      controller: 'RegisterController',
      data: {
        requireLogin: false,
        roles: []
      }
    });

  $urlRouterProvider.otherwise('login');
}]);
