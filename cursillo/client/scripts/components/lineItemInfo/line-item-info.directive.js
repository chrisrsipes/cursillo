angular.module('app').directive('lineItemInfo', ['Item', '$timeout', function (Item, $timeout) {
  return {
    restrict: 'A',
    templateUrl: 'scripts/components/lineItemInfo/line-item-info.template.html',
    scope: {
      itemId: '@',
      quantity: '@'
    },
    link: function (scope, elem) {
      
      Item.findById({id: scope.itemId}, function (item) {
        scope.item = item;
      });

    }
  }
}]); 
