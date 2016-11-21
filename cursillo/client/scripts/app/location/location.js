angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('location', {
      parent: 'app',
      url: '/locations',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

  .state('location.list', {
      parent: 'location',
      url: '/list',
      templateUrl: 'scripts/app/location/locationList.template.html',
      controller: 'LocationListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })
  
  .state('location.create', {
      parent: 'location',
      url: '/create',
      templateUrl: 'scripts/app/location/locationEdit.template.html',
      controller: 'LocationEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('location.edit', {
      parent: 'location',
      url: '/:id/edit',
      templateUrl: 'scripts/app/location/locationEdit.template.html',
      controller: 'LocationEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })
  
  .state('location.detail', {
      parent: 'location',
      url: '/:id/detail',
      templateUrl: 'scripts/app/location/locationDetail.template.html',
      controller: 'LocationDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    });


}]);
