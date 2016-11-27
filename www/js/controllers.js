angular.module('roomfinder.controllers', [])

.controller('MapCtrl', ['$scope', '$stateParams', 'FreeCanvas', 'Mapas', 'Rooms', function($scope, $stateParams, FreeCanvas, Mapas, Rooms) {
  var room = Rooms.get($stateParams.code);
  var mapa = Mapas.get(room.maps[0]);
  var gps = room.pos;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var canvas =  FreeCanvas.setCanvas('canvas', function (context) {
    context.drawImage(sticky, 0, 0);

  }, function (context) {
    if(gps[0] != 0 && gps[1] != 0){
      var pos = Mapas.converter(mapa.transform, mapa.p0, gps);
      pos = canvas.world2canvas(pos);
      context.drawImage(point, pos[0]-14, pos[1]-40);
    }
  });

  var sticky = new Image();
  sticky.src = mapa.src;
  sticky.onload = canvas.draw;
  var point = new Image();
  point.src = 'img/place.svg'
  point.onload = canvas.draw;
}])
.controller('SearchCtrl', ['$scope', 'Rooms', function($scope, Rooms){
  $scope.searchtext = '';
  $scope.results = [];
  $scope.$watch('searchtext',function(){
    $scope.results = Rooms.find($scope.searchtext);
  });	 
}]);
