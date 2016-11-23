angular
  .module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('talk', {
      parent: 'app',
      url: '/talks',
      template: '<ui-view />',
      controller: ['$scope', function ($scope) {}],
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

  .state('talk.list', {
      parent: 'talk',
      url: '/list',
      templateUrl: 'scripts/app/talk/talkList.template.html',
      controller: 'TalkListController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    })

  .state('talk.create', {
      parent: 'talk',
      url: '/create',
      templateUrl: 'scripts/app/talk/talkEdit.template.html',
      controller: 'TalkEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

  .state('talk.edit', {
      parent: 'talk',
      url: '/:id/edit',
      templateUrl: 'scripts/app/talk/talkEdit.template.html',
      controller: 'TalkEditController',
      data: {
        requireLogin: true,
        roles: ['admin']
      }
    })

  .state('talk.detail', {
      parent: 'talk',
      url: '/:id/detail',
      templateUrl: 'scripts/app/talk/talkDetail.template.html',
      controller: 'TalkDetailController',
      data: {
        requireLogin: true,
        roles: ['admin', 'secretary', 'rector']
      }
    });


}]);
