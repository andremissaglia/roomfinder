angular.module('roomfinder.controllers', [])

.controller('MapCtrl', ['$scope', '$ionicScrollDelegate', 'FreeCanvas', function($scope, $ionicScrollDelegate, FreeCanvas) {

  var canvas =  FreeCanvas.setCanvas('canvas', function (context) {
    context.drawImage(sticky, 0, 0);
  });

  var sticky = new Image();
  sticky.src = "img/mapas/campus.gif";
  sticky.onload = canvas.draw;
}]);
