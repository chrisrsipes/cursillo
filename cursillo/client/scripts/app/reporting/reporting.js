angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('reporting', {
      parent: 'app',
      url: '/reporting',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary']
      }
    })

  .state('reporting.weekends', {
      parent: 'reporting',
      url: '/weekends',
      templateUrl: 'scripts/app/reporting/reporting-weekend.template.html',
      controller: 'ReportingWeekendController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary']
      }
    });


}]);
