angular.module('app').directive('applicationConsole', function () {
  return {
    restrict: 'A',
    templateUrl: 'scripts/components/applicationConsole/applicationConsole.template.html',
    scope: {
      personId: '='
    },
    link: function (scope, elem, attrs) {},
    controller: ['$scope', '$uibModal', 'Person', 'Application', function ($scope, $uibModal, Person, Application) {
      $scope.applicationInfo;
      $scope.editMode = false;

      $scope.loadApplication = function () {
        Person.getApplication({id: $scope.personId}, function (application) {
          console.log('application', application);
          $scope.applicationInfo = application;
        });
      };

      $scope.enableEditMode = function () {
        $scope.editMode = true;
      };

      $scope.cancel = function () {
        $scope.editMode = false;
        $scope.loadApplication();
      };

      $scope.updateApplication = function () {
        $scope.editMode = false;
        Application.update({id: $scope.applicationInfo.id}, $scope.applicationInfo);
      };

      $scope.loadApplication();

    }]

  }
});
