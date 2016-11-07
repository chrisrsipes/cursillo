angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      parent: 'app',
      url: '/dashboard',
      templateUrl: 'scripts/app/dashboard/dashboard.template.html',
      // controller: 'DashboardController',
      controller: ['$scope', function ($scope) {
        console.log('in dashboard scope');
      }],
      data: {
        requireLogin: true
      }
    });
}]);
