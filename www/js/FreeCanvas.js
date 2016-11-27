angular.module('roomfinder.services')
.factory('FreeCanvas', function(){
  return {
    setCanvas: function (canvasID, onDraw, afterDraw){
      var canvas = document.getElementById(canvasID);
      var context = canvas.getContext("2d");
      var buttons = [];
      var resizeCanvas = function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        draw();
      };
      window.addEventListener('resize', resizeCanvas, false);

      var transform = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
      var addButton = function(button) {
        button.id = Math.floor((1 + Math.random()) * 0x10000);
        buttons.push(button);
        return button.id;
      };
      var removeButton = function(button) {
        var index = buttons.indexOf(button);
        if(index > -1)
          buttons.splice(index, 1);
      };
      var checkCollision = function(button, x, y) {
        return (button.min.x < x && x < button.max.x &&
        button.min.y < y && y < button.max.y);
      };
      var getBounds = function () {
        return { width: canvas.width, height: canvas.height };
      };
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
        afterDraw(context);

        buttons.forEach(function (button) {
          if(button.img != null && button.img != undefined)
            context.drawImage(button.img, button.min.x, button.min.y, button.width, button.height);
        });
      };
      var move = function(x,y){
        var translate = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]]);
        transform = math.multiply(translate, transform);
        draw();
      };
      var zoom = function(x,y, amount) {
        var translate;
        var scale;
        translate = math.matrix([[1, 0, -x], [0, 1, -y], [0, 0, 1]]);
        scale = math.matrix([[amount, 0, 0], [0, amount, 0], [0, 0, 1]]);
        transform = math.multiply(translate, transform);
        transform = math.multiply(scale, transform);
        translate = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]]);
        transform = math.multiply(translate, transform);
        draw();
      };
      var world2canvas = function(posWorld){
        var posCanvas = math.multiply(transform, [posWorld[0], posWorld[1], 1]);
        return [
          posCanvas.subset(math.index(0)),
          posCanvas.subset(math.index(1))
        ]
      };

      // drag
      var isDragging = false;
      canvas.addEventListener('click', function(event){
        buttons.forEach(function (button) {
          if(checkCollision(button, event.x, event.y))
            button.onClick();
        });
      });
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
      var vx, vy;
      var lastTime = 0;
      canvas.addEventListener('touchstart', function(event){
        isDragging = true;
        var rect = canvas.getBoundingClientRect();
        var x = event.touches[0].clientX - rect.left;
        var y = event.touches[0].clientY - rect.top;
        lastX = x;
        lastY = y;
        vx = 0;
        vy = 0;
        lastTime = new Date();
      });
      canvas.addEventListener('touchend', function(event){
        isDragging = false;
        var dt = 30;// ~33FPS
        var k = 300;
        var t = 0.1;
        console.log(Math.sqrt(vx*vx+vy*vy));
        var inercia = function(){
          if(isDragging){
            return;
          }
          var a = 1/(1+dt/k);
          move(vx*dt, vy*dt/2);
          vx *= a;
          vy *= a;
          if(vx*vx+vy*vy > t*t){
            window.setTimeout(inercia, dt);
          }
        };
        window.setTimeout(inercia, dt);
      });
      canvas.addEventListener('touchmove', function(event){
        if(isDragging){
          var rect = canvas.getBoundingClientRect();
          var x = event.touches[0].clientX - rect.left;
          var y = event.touches[0].clientY - rect.top;
          move(x-lastX, y-lastY);
          event.preventDefault();
          var currentTime =new Date();
          if(currentTime > lastTime){
            vx = (x - lastX) / (currentTime - lastTime);
            vy = (y - lastY) / (currentTime - lastTime);
            lastTime = currentTime;
          }
          lastX = x;
          lastY = y;
        }
      });
      // scroll zoom
      canvas.addEventListener('mousewheel', function(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        zoom(x,y,1+event.wheelDelta/1200);
      });
      canvas.addEventListener('DOMMouseScroll', function(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        zoom(x,y,1-event.detail/30);
      });
      // pinch zoom
      var mc = new Hammer.Manager(canvas);
      var pinch = new Hammer.Pinch();
      mc.add([pinch]);
      var lastScale = 1;
      mc.on('pinch', function (event) {
        zoom(event.center.x,event.center.y,event.scale/lastScale);
        lastScale = event.scale;
      });
      mc.on('pinchend', function (event){
        lastScale = 1;
      });

      resizeCanvas();

      return {
        draw: draw,
        move: move,
        zoom: zoom,
        world2canvas: world2canvas,
        addButton: addButton,
        removeButton: removeButton,
        getBounds: getBounds
      }
    }
  };
});
