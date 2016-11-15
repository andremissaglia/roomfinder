angular.module('roomfinder.controllers', [])

.controller('MapCtrl', ['$scope', '$ionicScrollDelegate', 'FreeCanvas', 'Mapas', function($scope, $ionicScrollDelegate, FreeCanvas, Mapas) {
  var mapa = Mapas.mapas[0];
  var gps = [-22.0075918, -47.8952985]
  var canvas =  FreeCanvas.setCanvas('canvas', function (context) {
    context.drawImage(sticky, 0, 0);
    var pos = Mapas.converter(mapa.transform, mapa.p0, gps);
    context.fillRect(pos[0]-10, pos[1]-10, 20, 20);
  });

  var sticky = new Image();
  sticky.src = mapa.src;
  sticky.onload = canvas.draw;
}]);
