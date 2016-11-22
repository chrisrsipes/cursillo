angular.module('app')
  .controller('TalkBuilderModalController', ['$scope', 'Talk', 'TalkLink', 'Person', '$uibModalInstance', 'weekendId', function ($scope, Talk, TalkLink, Person, $uibModalInstance, weekendId) {

    $scope.selected = {
      talkId: null,
      personId: null
    };

    $scope.weekendId = weekendId;
    $scope.talks = [];
    $scope.talkPeople = [];
    $scope.people = [];

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.loadPeopleByTalkId = function () {
      Talk.getPeople({id: $scope.selected.talkId}, function (people) {
        var med = {}, res = [];

        angular.forEach(people, function (val) {
          if (med[val.personId]) {
            med[val.personId].count++;
          }
          else {
            med[val.id] = {
              personId: val.personId,
              firstName: val.firstName,
              lastName: val.lastName,
              count: 1
            }
          }
        });

        angular.forEach(med, function (val) {
          res.push(val);
        });

        $scope.talkPeople = res;


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

    $scope.selectPerson = function (id) {
      $scope.selected.personId = id;
    };

    $scope.loadPeopleTalkLinks = function () {
      if ($scope.selected.personId) {
        Person.getTalkLinks({id: $scope.selected.personId}, function (talkLinks) {
          $scope.talkLinks = talkLinks;
        });
      }
      else {
        $scope.talkLinks = [];
      }
    };

    $scope.createTalkLink = function () {
      var talkLink = {
        talkId: $scope.selected.talkId,
        weekendId: $scope.weekendId,
        personId: $scope.selected.personId,
        status: 'PENDING'

      };

      TalkLink.create(talkLink, function (talkLink) {
        $uibModalInstance.close(talkLink);
      });
    };

    $scope.loadTalks();
    $scope.loadPeople();

    $scope.$watch('selected.personId', $scope.loadPeopleTalkLinks);

  }]);
