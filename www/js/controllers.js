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
}]);

