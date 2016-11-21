angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('weekend', {
      parent: 'app',
      url: '/weekends',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

    .state('weekend.list', {
      parent: 'weekend',
      url: '/list',
      templateUrl: 'scripts/app/weekend/weekendList.template.html',
      controller: 'WeekendListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

    .state('weekend.create', {
      parent: 'weekend',
      url: '/create',
      templateUrl: 'scripts/app/weekend/weekendEdit.template.html',
      controller: 'WeekendEditController',
      data: {
        requireLogin: true,
        roles: ['admin','rector']
      }
    })

    .state('weekend.edit', {
      parent: 'weekend',
      url: '/:id/edit',
      templateUrl: 'scripts/app/weekend/weekendEdit.template.html',
      controller: 'WeekendEditController',
      data: {
        requireLogin: true,
        roles: ['admin','rector']
      }
    })

    .state('weekend.detail', {
      parent: 'weekend',
      url: '/:id/detail',
      templateUrl: 'scripts/app/weekend/weekendDetail.template.html',
      controller: 'WeekendDetailController',
      data: {
        requireLogin: true,
        roles: ['admin','rector', 'secretary']
      }
    });


}]);
