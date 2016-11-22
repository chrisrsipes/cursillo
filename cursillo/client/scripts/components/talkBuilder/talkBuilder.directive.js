angular.module('app').directive('talkBuilder', function () {
  return {
    restrict: 'A',
    templateUrl: 'scripts/components/talkBuilder/talkBuilder.template.html',
    scope: {
      weekendId: '='
    },
    link: function (scope, elem, attrs) {},
    controller: ['$scope', '$uibModal', 'Talk', 'TalkLink', 'Weekend', 'Notification', function ($scope, $uibModal, Talk, TalkLink, Weekend, Notification) {

      $scope.filledTalks = {};
      $scope.talks = [];
      $scope.talkLinks = [];
      $scope.people = [];

      $scope.loadTalks = function () {

        Talk.query(function (talks) {
          $scope.talks = talks;
        });

      };
      
      var markFilledTalks = function () {
        angular.forEach($scope.talkLinks, function (val) {
            if (val.status === 'ACTIVE')
              $scope.filledTalks[val.talkId] = true;
            else
              $scope.filledTalks[val.talkId] = false;
          });
      };

      $scope.loadTalkLinks = function () {
        Weekend.getTalkLinks({id: $scope.weekendId}, function (talkLinks) {
          $scope.talkLinks = talkLinks;
          markFilledTalks();
        });
      };


      $scope.assignTalks = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          size: 'lg',
          templateUrl: 'scripts/components/talkBuilder/talkBuilder.modal.template.html',
          controller: 'TalkBuilderModalController',
          resolve: {
            weekendId: function () {
              return $scope.weekendId;
            }
          }
        });

        modalInstance.result.then(function (selected) {
          
          if (selected.id) {
            $scope.loadTalkLinks();
          }
          else {
            Notification.error('Error creating talk assignment.');
          }
          
        }, function () {
          // cancelled
        });

      };
      
      $scope.updateTalkLinkStatus = function (talkLink, status) {
        var oldStatus = talkLink.status;
        
        talkLink.status = status;
        
        TalkLink.update({id: talkLink.id}, talkLink, function (tl) {
          markFilledTalks();
        }, function () {
          // there was an error
          talkLink.status = oldStatus;
          Notification.error('Error updating status on Talk Link.');
        });
        
      };

      $scope.loadTalks();
      $scope.loadTalkLinks();


    }]
  }
});
