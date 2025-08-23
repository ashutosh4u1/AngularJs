angular.module('todoApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<todo></todo>',
        controller: 'TodoController'
      })
      .when('/task', {
        template: '<task></task>',
        controller: 'TaskController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);