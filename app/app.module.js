angular.module('todoApp', ['ngRoute']);

$scope.highlight = function(index) {
  drawHighlight(index);
};

$scope.keyPress = function(event, index) {
  if (event.key === 'Enter' || event.key === ' ') {
    selectItem(index);
    event.preventDefault();
  }
};

function drawHighlight(index) {
  if (!$scope.items[index]) return;
  var item = $scope.items[index];
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.strokeRect(item.x, item.y, item.w, item.h);
}
