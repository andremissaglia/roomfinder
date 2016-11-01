angular.module('roomfinder.controllers', [])

.controller('MapCtrl', ['$scope', '$ionicScrollDelegate', function($scope, $ionicScrollDelegate) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  // $scope.config = {}; // use defaults
  // $scope.model = {}; // always pass empty object
  // $scope.onMouseWheel = function (evt, delta, dx, dy) {
  //   $ionicScrollDelegate.$getByHandle('mapa').zoomBy(1 + delta*0.5, false, evt.originalEvent.clientX, evt.originalEvent.clientY);
  //   evt.originalEvent.preventDefault();
  // };
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  // resize on init
  resizeCanvas();


  var sticky = new Image();
  sticky.src = "img/mapas/campus.gif";
  sticky.onload = function() {
    context.drawImage(sticky, 0, 0);
  };
  canvas.addEventListener('touchmove', function(event){
    if(event.targetTouches.length == 1){
      var touch = event.targetTouches[0];
      console.log(touch);
    }
  });

  var transform = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  console.log(transform);
  function draw(){
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
    context.drawImage(sticky, 0, 0);
    context.restore();
  };

  var isDragging = false;
  var scale = 1, x = 0, y = 0;
  canvas.addEventListener('mousedown', function(event){
    isDragging = true;
  });
  canvas.addEventListener('mouseup', function(event){
    isDragging = false;
  });
  canvas.addEventListener('mousemove', function(event){
    if(isDragging){
      var translate = math.matrix([[1, 0, event.movementX], [0, 1, event.movementY], [0, 0, 1]]);
      transform = math.multiply(translate, transform);
      draw();
      event.preventDefault();
    }
  });
  canvas.addEventListener('mouseout', function(event){
    isDragging = false;
  });
  canvas.addEventListener('mousewheel', function(event){
    var value = 1 + 0.1;
    if(event.wheelDelta < 0)
      value = 1 - 0.1;
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var translate;
    var scale;

    translate = math.matrix([[1, 0, -x], [0, 1, -y], [0, 0, 1]]);
    scale = math.matrix([[value, 0, 0], [0, value, 0], [0, 0, 1]]);
    transform = math.multiply(translate, transform);
    transform = math.multiply(scale, transform);
    translate = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]]);
    transform = math.multiply(translate, transform);
    draw();
  });
}]);
