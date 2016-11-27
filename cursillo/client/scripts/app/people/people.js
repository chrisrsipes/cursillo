/**
 * Created by deneshtotaram on 11/20/16.
 */
angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('people', {
      parent: 'app',
      url: '/people',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary']
      }
    })

    .state('people.list', {
      parent: 'people',
      url: '/list',
      templateUrl: 'scripts/app/people/personList.template.html',
      controller: 'PersonListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

    .state('people.create', {
      parent: 'people',
      url: '/create',
      templateUrl: 'scripts/app/people/personCreate.template.html',
      controller: 'PersonCreateController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('people.edit', {
      parent: 'people',
      url: '/:id/edit',
      templateUrl: 'scripts/app/people/personEdit.template.html',
      controller: 'PersonEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('people.detail', {
      parent: 'people',
      url: '/:id/detail',
      templateUrl: 'scripts/app/people/personDetail.template.html',
      controller: 'PersonDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })


  ;


}]);
