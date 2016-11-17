angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      parent: 'app',
      url: '/dashboard',
      templateUrl: 'scripts/app/dashboard/dashboard.template.html',
      controller: 'DashboardController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    });
}]);
