angular.module('app').directive('talkBuilder', function () {
  return {
    restrict: 'A',
    templateUrl: 'scripts/components/talkBuilder/talkBuilder.template.html',
    scope: {
      weekendId: '='
    },
    link: function (scope, elem, attrs) {},
    controller: ['$scope', '$uibModal', 'Talk', 'Weekend', function ($scope, $uibModal, Talk, Weekend) {

      $scope.filledTalks = {};
      $scope.talks = [];
      $scope.talkLinks = [];
      $scope.people = [];

      $scope.loadTalks = function () {

        Talk.query(function (talks) {
          $scope.talks = talks;
        });

      };

      $scope.loadTalkLinks = function () {
        Weekend.getTalkLinks({id: $scope.weekendId}, function (talkLinks) {
          $scope.talkLinks = talkLinks;

          angular.forEach(talkLinks, function (val) {
            if (val.status === 'ACTIVE')
              $scope.filledTalks[val.id] = true;
          });

        });
      };

      
      $scope.assignTalks = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          size: 'lg',
          templateUrl: 'scripts/components/talkBuilder/talkBuilder.modal.template.html',
          controller: ['$scope', 'Talk', 'Person', function ($scope, Talk, Person) {

            $scope.selected = { 
              talkId: null,
              personId: null
            };
            
            $scope.talks = [];
            $scope.talkPeople = [];
            $scope.people = [];
            
            $scope.loadPeopleByTalkId = function () {
              Talk.getPeople({id: $scope.selected.talkId}, function (people) {
                $scope.talkPeople = people;
              });
            };

            $scope.loadTalks = function () {
              Talk.query(function (talks) {
                $scope.talks = talks;
              });
            };
            
            $scope.loadPeople = function () {
              Person.query(function (people) {
                $scope.people = people;
              });
            };
            
            $scope.getFullName = function (person) {
              return [person.firstName, person.lastName].join(' ');
            };
            
            $scope.selectPerson = function (person) {
              $scope.selected.personId = person.id;
            };

            $scope.loadTalks();
            $scope.loadPeople();



          }]
        });

        modalInstance.result.then(function (selected) {
          console.log('selected', selected);
        }, function () {
          console.log('cancelled');
        });

      };

      $scope.loadTalks();
      $scope.loadTalkLinks();


    }]
  }
});
