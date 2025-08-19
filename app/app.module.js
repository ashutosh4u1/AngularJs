angular.module('todoApp', ['ngRoute']).directive('myDirective', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click keypress', function(event) {
				if (event.type === 'click' || event.which === 13) {
					// Handle click or Enter key press
				}
			});
		}
	};
});