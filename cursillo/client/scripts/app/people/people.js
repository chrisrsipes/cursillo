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
      templateUrl: 'scripts/app/people/peopleList.template.html',
      controller: 'PeopleListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

    .state('people.create', {
      parent: 'people',
      url: '/create',
      templateUrl: 'scripts/app/people/peopleEdit.template.html',
      controller: 'PeopleEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('people.edit', {
      parent: 'people',
      url: '/:id/edit',
      templateUrl: 'scripts/app/people/peopleEdit.template.html',
      controller: 'PeopleEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('people.detail', {
      parent: 'people',
      url: '/:id/detail',
      templateUrl: 'scripts/app/people/peopleDetail.template.html',
      controller: 'PeopleDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })


  ;


}]);
