angular.module('roomfinder.services', [])

  .factory('Mapas', function () {
    var mapas = [
      {
        code: 'ICMC-1',
        andar: 1,
        src: 'img/mapas/icmc/ICMC1-1.svg',
        transform: [[1937198.066467265, -105947.02265861645],
          [109624.67273438071, 1689732.0466947213]],
        p0: [-22.00779961378167, -47.895576131551955]
      }
    ];
    return {
      mapas: mapas,
      converter: function (transform, p0, ponto) {
        var px = ponto[0] - p0[0];
        var py = ponto[1] - p0[1];
        var x = transform[0][0] * px + transform[0][1] * py;
        var y = transform[1][0] * px + transform[1][1] * py;
        return [x, y];
      },
    }
  })
  .factory('Rooms', function () {
    var rooms = [
      {
        code: '1-105',
        maps: ['ICMC-1'],
        pos: [ -22.007565712914012, -47.89531078847889 ]
      }
    ];
    return {
      get: function (i) {
        return rooms[i];
      }
    };
  })
;
