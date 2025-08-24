<div class="canvas-accessibility-container">
  <div ng-repeat="item in items track by $index"
       tabindex="0"
       class="canvas-item"
       role="button"
       aria-label="{{item.label}}"
       ng-focus="handleFocus($index)"
       ng-keydown="handleKey($event, $index)">
    {{item.label}}
  </div>
</div>