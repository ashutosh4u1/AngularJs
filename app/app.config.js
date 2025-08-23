angular.module('todoApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<todo></todo>',
        controller: 'TodoController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);