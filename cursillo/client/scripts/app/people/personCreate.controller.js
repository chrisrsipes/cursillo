angular.module('app').controller('PersonCreateController', ['$scope', 'Person', 'Application', 'Contact', 'Parish', 'Role', '$stateParams', '$state', '$q', 'Notification', function ($scope, Person, Application, Contact, Parish, Role, $stateParams, $state, $q, Notification) {

  $scope.personId = $stateParams.id;
  $scope.parishes = [];

  $scope.selected = { contactType: null };
  $scope.person = { isTeamMember: false };
  
  $scope.applicationInfo = {
    isCatholic: false,
    isConverted: false,
    receivesEucharist: false,
    requestLowerBunk: false
  };

  $scope.types = [
    {
      name: 'EMERGENCY',
      label: 'Emergency'
    },
    {
      name: 'SPOUSE',
      label: 'Spouse'
    },
    {
      name: 'CHILD',
      label: 'Child'
    }

  ];

  $scope.createContact = function (type) {
    return {
      type: type,
      hasAttendedCursillo: false
    };
  };

  $scope.contacts = [
    $scope.createContact('EMERGENCY'),
    $scope.createContact('EMERGENCY')
  ];

  $scope.removeContact = function (ind) {
    $scope.contacts.splice(ind, 1);
  };

  $scope.addContact = function (type) {
    $scope.contacts.push({ type: $scope.selected.contactType });
    $scope.selected.contactType = null;
  };

  $scope.loadParishes = function () {
    Parish.query(function (parishes) {
      $scope.parishes = parishes;
    });
  };

  $scope.submitApplication = function () {

    Person.create($scope.person, function (person) {

      if (person.id) {
        var contactPromises = [];

        // create application
        $scope.applicationInfo.personId = person.id;
        var applicationPromise = Application.create($scope.applicationInfo).$promise;

        // create contacts
        angular.forEach($scope.contacts, function (contact) {
          contact.personId = person.id;
          contactPromises.push(Contact.create(contact).$promise);
        });

        $q.all([applicationPromise].concat(contactPromises)).then(function (results) {
          console.log('application', results[0]);
          $state.go('people.detail', {id: person.id});
        });
      }
      else {
        Notification.error('Error creating person.');
      }
    });

  };

  $scope.loadParishes();

}]);
