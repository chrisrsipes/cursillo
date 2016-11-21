/**
 * Created by deneshtotaram on 11/20/16.
 */
angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('user', {
      parent: 'app',
      url: '/user',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('user.list', {
      parent: 'user',
      url: '/list',
      templateUrl: 'scripts/app/user/userList.template.html',
      controller: 'UserListController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('user.create', {
      parent: 'user',
      url: '/create',
      templateUrl: 'scripts/app/user/userEdit.template.html',
      controller: 'UserEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('user.edit', {
      parent: 'user',
      url: '/:id/edit',
      templateUrl: 'scripts/app/user/userEdit.template.html',
      controller: 'UserEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

    .state('user.detail', {
      parent: 'user',
      url: '/:id/detail',
      templateUrl: 'scripts/app/user/userDetail.template.html',
      controller: 'UserDetailController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })


  ;


}]);
