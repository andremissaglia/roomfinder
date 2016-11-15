angular.module('roomfinder.services', [])

  .factory('Mapas', function () {
    var mapas = [
      {
        bloco: 'ICMC-1',
        andar: 1,
        src: 'img/mapas/icmc/ICMC1-1.svg',
        transform: [[1814938.6912103002, -93876.13635862683],
          [103307.31779825818, 1592357.6624012147]],
        p0: [-22.00779911982748, -47.895574703232995]
      }
    ];
    return {
      mapas: mapas,
      converter: function (transform, p0, ponto) {
        var px = ponto[0] - p0[0];
        var py = ponto[1] - p0[1];
        var x = transform[0][0]*px+transform[0][1]*py;
        var y = transform[1][0]*px+transform[1][1]*py;
        return [x,y];
      },
    }
  })
;
