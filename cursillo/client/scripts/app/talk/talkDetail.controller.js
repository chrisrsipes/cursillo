angular.module('app').controller('TalkDetailController', ['$scope', 'Talk', '$stateParams', function ($scope, Talk, $stateParams) {

  $scope.talk;
  $scope.talkId = $stateParams.id;


  $scope.loadTalk = function () {
    Talk.get({id: $scope.talkId}, function (talk) {
      $scope.talk = talk;
    });
  };

  $scope.loadTalk();

}]);
