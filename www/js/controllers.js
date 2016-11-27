angular.module('roomfinder.controllers', [])

.controller('MapCtrl', ['$scope', 'FreeCanvas', 'Mapas', 'Rooms', function($scope, FreeCanvas, Mapas, Rooms) {
  var mapa = Mapas.mapas[0];
  var gps = Rooms.get(0).pos;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
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
  var magnify = {
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
    onClick: function () {
      console.log('Magnify');
    }
  };
  magnify.img = new Image();
  magnify.img.src = 'img/magnify.png';
  var reduce = {
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
    onClick: function () {
      console.log('Reduce');
    }
  };
  reduce.img = new Image();
  reduce.img.src = 'img/reduce.png';
  var upstairs = {
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
    onClick: function () {
      console.log('Up');
    }
  };
  upstairs.img = new Image();
  upstairs.img.src = 'img/up.png';
  var downstairs = {
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
    onClick: function () {
      console.log('Down');
    }
  };
  downstairs.img = new Image();
  downstairs.img.src = 'img/down.png';
  var canvas =  FreeCanvas.setCanvas('canvas', function (context) {
    if(canvas == undefined)
      return;
    context.drawImage(sticky, 0, 0);

  }, function (context) {
    if(canvas == undefined)
      return;
    if(gps[0] != 0 && gps[1] != 0){
      var pos = Mapas.converter(mapa.transform, mapa.p0, gps);
      pos = canvas.world2canvas(pos);
      context.drawImage(point, pos[0]-14, pos[1]-40);

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

  var sticky = new Image();
  sticky.src = mapa.src;
  sticky.onload = canvas.draw;
  var point = new Image();
  point.src = 'img/place.svg'
  point.onload = canvas.draw;
}]);
