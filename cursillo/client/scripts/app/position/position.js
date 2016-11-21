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
        roles: ['admin', 'secretary', 'rector']
      }
    })

  .state('position.list', {
      parent: 'position',
      url: '/list',
      templateUrl: 'scripts/app/position/positionList.template.html',
      controller: 'PositionListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })
  
  .state('position.create', {
      parent: 'position',
      url: '/create',
      templateUrl: 'scripts/app/position/positionEdit.template.html',
      controller: 'PositionEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('position.edit', {
      parent: 'position',
      url: '/:id/edit',
      templateUrl: 'scripts/app/position/positionEdit.template.html',
      controller: 'PositionEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('position.detail', {
      parent: 'position',
      url: '/:id/detail',
      templateUrl: 'scripts/app/position/positionDetail.template.html',
      controller: 'PositionDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    });


}]);
