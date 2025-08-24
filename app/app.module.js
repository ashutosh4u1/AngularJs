angular.module('todoApp', ['ngRoute']).directive('customElement', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.attr('tabindex', '0');
        }
    };
});