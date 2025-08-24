angular.module("todoApp").controller("TodoController", [
  "$scope",
  "$timeout",
  function ($scope, $timeout) {
    $scope.todos = [
      { id: 1, text: "Task 1" },
      { id: 2, text: "Task 2" },
      { id: 3, text: "Task 3" },
      { id: 4, text: "Task 4" },
      { id: 5, text: "Task 5" },
    ];
    $scope.newTodo = "";
    $scope.filter = "all"; // Default filter: all
    $scope.editingTodo = null; // Track todo being edited
    $scope.tasks = [
      {
        title: "Learn AngularJS",
        description: "Read docs",
        dueDate: new Date(),
        status: "Pending",
      },
    ];
    let currentHighlight = -1;
    var canvas;
    var ctx;

    $scope.items = [
      { x: 50, y: 50, w: 60, h: 60, color: "red", label: "Red square" },
      { x: 150, y: 70, w: 60, h: 60, color: "green", label: "Green square" },
      { x: 250, y: 40, w: 60, h: 60, color: "blue", label: "Blue square" },
    ];

    // Initial draw
    $timeout(() => {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");
      drawItems();
    });

    function drawItems() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $scope.items.forEach((item, i) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.w, item.h);

        if (i === currentHighlight) {
          ctx.strokeStyle = "yellow";
          ctx.lineWidth = 4;
          ctx.strokeRect(item.x - 2, item.y - 2, item.w + 4, item.h + 4);
        }
      });
    }

    $scope.newTask = { status: "Pending" };

    // Add a new todo
    $scope.addTodo = function () {
      if ($scope.newTodo) {
        $scope.todos.push({
          id: $scope.todos.length + 1,
          text: $scope.newTodo,
        });
        $scope.newTodo = "";
        $scope.$applyAsync(); // Ensure UI updates
      }
    };

    // Remove a todo
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
      $scope.$applyAsync(); // Ensure UI updates
    };

    // Start editing a todo
    $scope.editTodo = function (todo) {
      $scope.editingTodo = angular.copy(todo); // Copy to allow canceling
      $scope.$applyAsync(); // Ensure UI updates
    };

    // Save edited todo
    $scope.saveEdit = function (todo) {
      if ($scope.editingTodo && $scope.editingTodo.text) {
        todo.text = $scope.editingTodo.text;
        $scope.editingTodo = null;
        $scope.$applyAsync(); // Ensure UI updates
      }
    };

    // Cancel editing
    $scope.cancelEdit = function () {
      $scope.editingTodo = null;
      $scope.$applyAsync(); // Ensure UI updates
    };

    // Filter todos based on selection
    $scope.filteredTodos = function () {
      return $scope.todos; // Only 'all' filter is relevant
    };

    // Count all todos
    $scope.activeCount = function () {
      return $scope.todos.length;
    };

    $scope.addTask = function () {
      if ($scope.newTask.title) {
        $scope.tasks.push({
          title: $scope.newTask.title,
          description: $scope.newTask.description,
          dueDate: $scope.newTask.dueDate,
          status: $scope.newTask.status,
        });
        $scope.newTask = { status: "Pending" };
      }
    };

    $scope.editTask = function (task) {
      var title = prompt("Edit title", task.title);
      if (title != null) task.title = title;
      var desc = prompt("Edit description", task.description);
      if (desc != null) task.description = desc;
    };

    $scope.deleteTask = function (index) {
      $scope.tasks.splice(index, 1);
    };

    // Add accessibility support for canvas elements
    // Add keyboard and screen reader accessibility support for canvas elements
    // Add hidden focusable elements for each canvas item
    // Add AngularJS handlers for focus and keyboard events for each canvas
    // Update canvas draw functions to show visual highlight of focused items
    // Add ARIA roles and labels for each interactive item
    // Mark decorative canvas content with 'aria-hidden="true"'
  },
]);