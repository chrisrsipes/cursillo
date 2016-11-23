angular.module('app').controller('TalkEditController', ['$scope', 'Talk', '$stateParams', '$state', function ($scope, Talk, $stateParams, $state) {

  $scope.talk;
  $scope.talkId = $stateParams.id;
  $scope.edit = !!$scope.talkId;

  $scope.createTalk = function () {
    Talk.create($scope.talk, function (res) {
      $state.go('talk.detail', {id: res.id});
    });

  };

  $scope.loadTalk = function () {
    Talk.get({id: $scope.talkId}, function (res) {
      $scope.talk = res;
    });
  };

  $scope.updateTalk = function () {
    Talk.update({id: $scope.talkId}, $scope.talk, function (talk) {
      $state.go('talk.detail', {id: $scope.talkId});
    });
  };

  if ($scope.edit) {
    $scope.loadTalk();
  }

}]);
