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
    let currentHighlight1 = -1;
    var canvas;
    var ctx;

    var canvas1;
    var ctx1;

    $scope.items = [
      { x: 50, y: 50, w: 60, h: 60, color: "red", label: "Red square" },
      { x: 150, y: 70, w: 60, h: 60, color: "green", label: "Green square" },
      { x: 250, y: 40, w: 60, h: 60, color: "gray", label: "Gray square" },
    ];


    $scope.additionalShapes = [
  { x: 50, y: 50, w: 60, h: 60, color: "red", label: "Red square", shape: "square" },
  { x: 150, y: 70, w: 60, h: 60, color: "green", label: "Green rectangle", shape: "rectangle" },
  { x: 250, y: 40, w: 60, h: 60, color: "gray", label: "Gray circle", shape: "circle" },
  { x: 370, y: 60, w: 60, h: 60, color: "purple", label: "Purple ellipse", shape: "ellipse" },
  { x: 500, y: 80, w: 60, h: 60, color: "orange", label: "Orange triangle", shape: "triangle" }
];

    // Initial draw
    $timeout(() => {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");
      drawItems();

      canvas1 = document.getElementById("myCanvas1");
      ctx1 = canvas1.getContext("2d");
      drawItems();
      drawAdditionalItems();
    });


function drawAdditionalItems() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  $scope.additionalShapes.forEach((item, i) => {
    ctx1.fillStyle = item.color;

    switch (item.shape) {
      case "square":
        ctx1.fillRect(item.x, item.y, item.w, item.w);
        break;

      case "rectangle":
        ctx1.fillRect(item.x, item.y, item.w * 1.5, item.h); // wider than square
        break;

      case "circle":
        ctx1.beginPath();
        ctx1.arc(item.x + item.w / 2, item.y + item.h / 2, item.w / 2, 0, Math.PI * 2);
        ctx1.fill();
        break;

      case "ellipse":
        ctx1.beginPath();
        ctx1.ellipse(item.x + item.w / 2, item.y + item.h / 2, item.w / 2, item.h / 3, 0, 0, Math.PI * 2);
        ctx1.fill();
        break;

      case "triangle":
        ctx1.beginPath();
        ctx1.moveTo(item.x + item.w / 2, item.y); // top
        ctx1.lineTo(item.x, item.y + item.h);     // bottom left
        ctx1.lineTo(item.x + item.w, item.y + item.h); // bottom right
        ctx1.closePath();
        ctx1.fill();
        break;
    }

    // Highlight border if selected
    if (i === currentHighlight1) {
      ctx1.strokeStyle = "blue";
      ctx1.lineWidth = 4;
      //ctx1.stroke();

       if (item.shape === "square" || item.shape === "rectangle") {
       ctx1.strokeRect(item.x - 2, item.y - 2, item.w + 4, item.h + 4);
       }
       else{
      ctx1.stroke();

       }

      // if (item.shape === "circle" || item.shape === "ellipse") {
      ctx1.beginPath();
      //   //ctx1.beginPath();
      //   //ctx1.ellipse(item.x + item.w / 2, item.y + item.h / 2, item.w / 2 + 4, item.h / 2 + 4, 0, 0, Math.PI * 2);
      //   ctx1.stroke();
      // } else {
      //   ctx1.strokeRect(item.x - 2, item.y - 2, item.w + 4, item.h + 4);
      // }
    }
  });
}


    function drawItems() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $scope.items.forEach((item, i) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.w, item.h);

        if (i === currentHighlight) {
          ctx.strokeStyle = "blue";
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
  },
]);
