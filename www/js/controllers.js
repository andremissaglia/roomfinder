angular.module('roomfinder.controllers', [])

.controller('MapCtrl', ['$scope', '$stateParams', 'FreeCanvas', 'Mapas', 'Rooms', '$cordovaGeolocation', function($scope, $stateParams, FreeCanvas, Mapas, Rooms, $cordovaGeolocation) {
  var button = function(image, action){
    var btn = {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 0,
        y: 0
      },
      width: 64,
      height: 64,
      onClick: action
    };
    btn.img = new Image();
    btn.img.src = image;
    return btn;
  };
  $cordovaGeolocation.watchPosition({enableHighAccuracy:true})
    .then(
      null,
      function (err) {

      },
      function(position){
      userPosition = [position.coords.latitude, position.coords.longitude];
      canvas.draw();
  });
  var room = Rooms.get($stateParams.code);
  var roomMap = Mapas.getByCode(room.maps[0]);
  var mapa;
  var roomPosition = room.pos;
  var userPosition =  null;
  var roomStack = [];
  var magOffset = {
    x: 100,
    y: 20,
    padding: 10
  };
  var floorOffset = {
    x: 20,
    y: 100,
    padding: 10
  };
  var magnify = button('img/magnify.png', function () {
    if(roomStack.length == 0){
      return;
    }
    canvas.clearTransform();
    setMapa(roomStack.pop());
    console.log(Mapas.gps2map(mapa, room.pos));
    canvas.centerAt(Mapas.gps2map(mapa, room.pos));
  });
  var reduce = button('img/reduce.png', function () {
    if(mapa.out){
      roomStack.push(mapa);
      canvas.clearTransform();
      setMapa(Mapas.getByCode(mapa.out));
      console.log(Mapas.gps2map(mapa, room.pos));
      canvas.centerAt(Mapas.gps2map(mapa, room.pos));
    }
  });
  var upstairs = button('img/up.png', function () {
    var novoMapa = Mapas.getByLocation(mapa.bloco, mapa.andar+1);
    if(novoMapa){
      setMapa(novoMapa);
    }
  });
  var downstairs = button('img/down.png', function () {
    var novoMapa = Mapas.getByLocation(mapa.bloco, mapa.andar-1);
    if(novoMapa){
      setMapa(novoMapa);
    }
  });
  var canvas =  FreeCanvas.setCanvas('canvas', function (context) {
    if(canvas == undefined)
      return;
    context.drawImage(sticky, 0, 0);

  }, function (context) {
    if(canvas == undefined)
      return;
    if(mapa.andar == roomMap.andar || roomStack.length > 0){
      var pos = Mapas.gps2map(mapa, roomPosition);
      pos = canvas.world2canvas(pos);
      context.drawImage(point, pos[0]-14, pos[1]-40);
    }
    if(userPosition != null){
      var pos = Mapas.gps2map(mapa, userPosition);
      pos = canvas.world2canvas(pos);
      context.beginPath();
      var gradient = context.createRadialGradient(pos[0], pos[1], 8, pos[0], pos[1], 40);
      gradient.addColorStop(0, '#ceddf0');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.arc(pos[0], pos[1], 40, 2*Math.PI, false);
      context.fillStyle = gradient;
      context.fill();

      context.beginPath();
      context.arc(pos[0], pos[1], 8, 2*Math.PI, false);
      context.fillStyle = '#4285f4';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = 'white';
      context.stroke();
    }

    var bounds = canvas.getBounds();
    reduce.min.x = bounds.width - magnify.width - magOffset.x;
    reduce.min.y = bounds.height - magnify.height - magOffset.y;
    magnify.min.x = bounds.width - magnify.width - reduce.width - magOffset.padding - magOffset.x;
    magnify.min.y = bounds.height - magnify.height - magOffset.y;

    reduce.max.x = reduce.min.x + reduce.width;
    reduce.max.y = reduce.min.y + reduce.height;
    magnify.max.x = magnify.min.x + magnify.width;
    magnify.max.y = magnify.min.y + magnify.height;

    downstairs.min.x = bounds.width - downstairs.width - floorOffset.x;
    downstairs.min.y = bounds.height - downstairs.height - floorOffset.y;
    upstairs.min.x = bounds.width - upstairs.width - floorOffset.x;
    upstairs.min.y = bounds.height - upstairs.height - downstairs.height - floorOffset.padding - floorOffset.y;

    downstairs.max.x = downstairs.min.x + downstairs.width;
    downstairs.max.y = downstairs.min.y + downstairs.height;
    upstairs.max.x = upstairs.min.x + upstairs.width;
    upstairs.max.y = upstairs.min.y + upstairs.height;
  });

  canvas.addButton(magnify);
  canvas.addButton(reduce);
  canvas.addButton(upstairs);
  canvas.addButton(downstairs);

  var sticky = null;
  var setMapa = function (m) {
    mapa = m;
    sticky = new Image();
    sticky.src = m.src;
    sticky.onload = canvas.draw;
  };
  setMapa(roomMap);
  var point = new Image();
  point.src = 'img/place.svg';
  point.onload = canvas.draw;
  canvas.centerAt(Mapas.gps2map(mapa, room.pos));
}])
.controller('SearchCtrl', ['$scope', 'Rooms', function($scope, Rooms){
  $scope.searchtext = '';
  $scope.results = [];
  $scope.update = function(term){
    $scope.results = Rooms.find(term);
  };
  $scope.update('');
  $scope.iconClass = 'ion-ios-location';
}])
.controller('TeacherCtrl', ['$scope', 'Teachers', function($scope, Teachers){
  $scope.searchtext = '';
  $scope.results = [];
  $scope.update = function(term){
    $scope.results = Teachers.find(term);
  };
  $scope.update('');
  $scope.iconClass = 'ion-ios-person';
}]);
