angular.module('todoApp', ['ngRoute']).directive('tabindex', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr('tabindex', '0');
    }
  };
});