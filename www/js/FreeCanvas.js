angular.module('roomfinder.services')
.factory('FreeCanvas', function(){
  return {
    setCanvas: function (canvasID, onDraw){
      var canvas = document.getElementById(canvasID);
      var context = canvas.getContext("2d");
      var resizeCanvas = function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
      };
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();

      var transform = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
      var draw = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.transform(
          transform.subset(math.index(0,0)),
          transform.subset(math.index(1,0)),
          transform.subset(math.index(0,1)),

          transform.subset(math.index(1,1)),
          transform.subset(math.index(0,2)),
          transform.subset(math.index(1,2))
        );
        onDraw(context);
        context.restore();
      };
      var move = function(x,y){
        var translate = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]]);
        transform = math.multiply(translate, transform);
        draw();
      };
      var zoom = function(x,y, amount) {
        var translate;
        var scale;
        amount += 1;
        translate = math.matrix([[1, 0, -x], [0, 1, -y], [0, 0, 1]]);
        scale = math.matrix([[amount, 0, 0], [0, amount, 0], [0, 0, 1]]);
        transform = math.multiply(translate, transform);
        transform = math.multiply(scale, transform);
        translate = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]]);
        transform = math.multiply(translate, transform);
        draw();
      };

      // drag
      var isDragging = false;
      canvas.addEventListener('mousedown', function(event){
        isDragging = true;
      });
      canvas.addEventListener('mouseup', function(event){
        isDragging = false;
      });
      canvas.addEventListener('mousemove', function(event){
        if(isDragging){
          move(event.movementX, event.movementY);
          event.preventDefault();
        }
      });
      canvas.addEventListener('mouseout', function(event){
        isDragging = false;
      });
      // touch drag
      var lastX, lastY;
      canvas.addEventListener('touchstart', function(event){
        isDragging = true;
        var rect = canvas.getBoundingClientRect();
        var x = event.touches[0].clientX - rect.left;
        var y = event.touches[0].clientY - rect.top;
        lastX = x;
        lastY = y;
      });
      canvas.addEventListener('touchend', function(event){
        isDragging = false;
      });
      canvas.addEventListener('touchmove', function(event){
        if(isDragging){
          var rect = canvas.getBoundingClientRect();
          var x = event.touches[0].clientX - rect.left;
          var y = event.touches[0].clientY - rect.top;
          move(x-lastX, y-lastY);
          event.preventDefault();
          lastX = x;
          lastY = y;
        }
      });
      // scroll zoom
      canvas.addEventListener('mousewheel', function(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        zoom(x,y,event.wheelDelta/1200);
      });
      canvas.addEventListener('DOMMouseScroll', function(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        zoom(x,y,-event.detail/30);
      });
      // TODO pinch zoom


      return {
        draw: draw,
        move: move,
        zoom: zoom,
      }
    }
  };
});
