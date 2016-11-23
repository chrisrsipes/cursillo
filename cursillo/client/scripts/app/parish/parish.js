angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('parish', {
      parent: 'app',
      url: '/parishs',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

  .state('parish.list', {
      parent: 'parish',
      url: '/list',
      templateUrl: 'scripts/app/parish/parishList.template.html',
      controller: 'ParishListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })
  
  .state('parish.create', {
      parent: 'parish',
      url: '/create',
      templateUrl: 'scripts/app/parish/parishEdit.template.html',
      controller: 'ParishEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('parish.edit', {
      parent: 'parish',
      url: '/:id/edit',
      templateUrl: 'scripts/app/parish/parishEdit.template.html',
      controller: 'ParishEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('parish.detail', {
      parent: 'parish',
      url: '/:id/detail',
      templateUrl: 'scripts/app/parish/parishDetail.template.html',
      controller: 'ParishDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    });


}]);
