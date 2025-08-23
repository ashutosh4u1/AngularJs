angular.module('todoApp')
  .component('todo', {
    templateUrl: 'app/components/todo/todo.template.html',
    controller: 'TodoController'
  })
  .component('taskList', {
    templateUrl: 'app/components/taskList/taskList.template.html',
    controller: 'TaskListController'
  });