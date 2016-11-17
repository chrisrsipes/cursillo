angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('position', {
      parent: 'app',
      url: '/positions',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

  .state('position.list', {
      parent: 'position',
      url: '/list',
      templateUrl: 'scripts/app/position/position-list.template.html',
      controller: 'PositionListController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    });


}]);
