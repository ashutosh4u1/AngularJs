angular.module('todoApp')
  .controller('TaskController', ['$scope', function($scope) {
  
  $scope.tasks = [
    { title: "Learn AngularJS", description: "Read docs", dueDate: new Date(), status: "Pending" }
  ];

  $scope.newTask = { status: "Pending" };

  $scope.addTask = function() {
    if($scope.newTask.title){
      $scope.tasks.push({
        title: $scope.newTask.title,
        description: $scope.newTask.description,
        dueDate: $scope.newTask.dueDate,
        status: $scope.newTask.status
      });
      $scope.newTask = { status: "Pending" };
    }
  };

  $scope.editTask = function(task) {
    var title = prompt("Edit title", task.title);
    if(title != null) task.title = title;
    var desc = prompt("Edit description", task.description);
    if(desc != null) task.description = desc;
  };

  $scope.deleteTask = function(index) {
    $scope.tasks.splice(index,1);
  };
}]);
