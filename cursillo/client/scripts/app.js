angular
  .module('app', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ui-notification',
    'ui.select',
    'LocalStorageModule',
    'datatables',
    'ngSanitize',
    'mwl.confirm'

  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'scripts/components/base/authenticatedLayout.template.html',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
          $scope.currentUser = $rootScope.currentUser;
        }],
        data: {
          requireLogin: true,
          roles: ['admin', 'secretary', 'rector']
        }
      })

    ;

  }])

  .service('AuthInterceptor', ['$rootScope', 'localStorageService', function ($rootScope, localStorageService) {

    var service = this;


  }])

  .config(['$httpProvider', function ($httpProvider) {
    // auth interceptor
    var unauthenticatedInterceptor = ['$timeout', '$q', '$injector', 'localStorageService', function ($timeout, $q, $injector, localStorageService) {
      var loginModal, $http, $state, localStorageService;

      $timeout(function () {
        loginModal = $injector.get('loginModal');
        $http = $injector.get('$http');
        $state = $injector.get('$state');
        // localStorageService = $injector.get('localStorageService');
      });

      return {
        request: function (config) {
          var session = angular.fromJson(localStorageService.get('session'));
          var token = session && session.id;

          if (token && config.url.indexOf('api') !== -1) {
            config.params = config.params || {};
            config.params['authorization'] = token;
          }

          return config;
        },
        responseError: function (rejection) {
          if (rejection.status !== 401) {
            return rejection;
          }

          var deferred = $q.defer();

          loginModal()
            .then(function () {
              deferred.resolve( $http(rejection.config) );

            })
            .catch(function () {
              $state.go('login');
              deferred.reject(rejection);
            });

          return deferred.promise;
        }
      };
    }];

    $httpProvider.interceptors.push(unauthenticatedInterceptor);


  }])
  .run(function ($rootScope, $state, $q, loginModal, Session, Principal) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin, fail;

      if (!toState || !toState.data) {
        throw Error("State requires requireLogin property under data to be valid.");
      }

      requireLogin = toState.data.requireLogin;

      fail = function () {
        loginModal()
          .then(function () {
            return $state.go(toState.name, toParams);
          })
          .catch(function () {
            // return $state.go('login');
          });

      };

      if (requireLogin && !$rootScope.currentUser) {
        event.preventDefault();

        Session.isStoredLocally().then(function (session) {
          if (session) {
            console.log('session', session);
            return $state.go(toState.name, toParams);
          }
          else {
            fail();
          }
        }, fail);
      }
      else if (requireLogin && $rootScope.currentUser) {
        if (!toState.data.roles) {
          throw Error('All state configs must have a roles property defined on the data property.');
        }

        if (Principal.isInAnyRole(toState.data.roles, Session.roles)) {
          return;
        }
        else {
          // go to permission denied page instead of dashboard
          event.preventDefault();
          $state.go('dashboard');
        }

      }
      else {
        return;
      }
    });
  });
