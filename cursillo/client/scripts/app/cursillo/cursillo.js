angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('cursillo', {
      parent: 'app',
      url: '/cursillos',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

  .state('cursillo.list', {
      parent: 'cursillo',
      url: '/list',
      templateUrl: 'scripts/app/cursillo/cursilloList.template.html',
      controller: 'CursilloListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })
  
  .state('cursillo.create', {
      parent: 'cursillo',
      url: '/create',
      templateUrl: 'scripts/app/cursillo/cursilloEdit.template.html',
      controller: 'CursilloEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('cursillo.edit', {
      parent: 'cursillo',
      url: '/:id/edit',
      templateUrl: 'scripts/app/cursillo/cursilloEdit.template.html',
      controller: 'CursilloEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('cursillo.detail', {
      parent: 'cursillo',
      url: '/:id/detail',
      templateUrl: 'scripts/app/cursillo/cursilloDetail.template.html',
      controller: 'CursilloDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    });


}]);
