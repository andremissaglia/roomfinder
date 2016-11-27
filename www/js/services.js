angular.module('roomfinder.services', [])

  .factory('Mapas', function () {
    var mapas = [
      {
        code: 'ICMC1-1',
        andar: 1,
        bloco: 'ICMC1',
        src: 'img/mapas/icmc/ICMC1-1.svg',
        transform: [[1937198.066467265, -105947.02265861645],
          [109624.67273438071, 1689732.0466947213]],
        p0: [-22.00779961378167, -47.895576131551955]
      },
      {
        code: 'ICMC1-0',
        andar: 0,
        bloco: 'ICMC1',
        src: 'img/mapas/icmc/ICMC1-T.svg',
        transform: [[1937198.066467265, -105947.02265861645],
          [109624.67273438071, 1689732.0466947213]],
        p0: [-22.00779961378167, -47.895576131551955]
      },
      {
        code: 'ICMC5-0',
        andar: 0,
        bloco: 'ICMC5',
        src: 'img/mapas/icmc/ICMC5-T.svg',
        transform: [[2156265.3249765597, -202808.48097665157],
          [55678.866973500924, 1720799.5382485413]],
        p0: [-22.007313325060114, -47.895567656624124]
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
      get: function(code){
      	var result = null;
        mapas.forEach(function(entry){
          if(entry.code==code){
            result = entry;
          }
        });
        return result;
      }
    }
  })
  .factory('Rooms', function () {
    var rooms = [//INICIO - ICMC BLOCO 1 ANDAR 1
      {
        code: '1-105',
        maps: ['ICMC1-1'],
        pos: [ -22.007565712914012, -47.89531078847889 ]
      },
      {
        code: '1-102',
        maps: ['ICMC1-1'],
        pos: [ -22.007540290566006, -47.89535563991952 ]
      },
      {
        code: '1-104',
        maps: ['ICMC1-1'],
        pos: [ -22.00761641944984, -47.895350700909226 ]
      },
      {
        code: '1-106',
        maps: ['ICMC1-1'],
        pos: [ -22.007632879749046, -47.89534963301511 ]
      },
      {
        code: '1-107',
        maps: ['ICMC1-1'],
        pos: [ -22.007652872934326, -47.895328214384584 ]
      },
      {
        code: '1-103',
        maps: ['ICMC1-1'],
        pos: [ -22.007554109489043, -47.895325152899396 ]
      },
      {
        code: '1-109',
        maps: ['ICMC1-1'],
        pos: [ -22.007440237034746, -47.89532898973882  ]
      },
      {
        code: '1-111',
        maps: ['ICMC1-1'],
        pos: [ -22.00742583427294, -47.895329924146175  ]
      },
      {
        code: '1-113',
        maps: ['ICMC1-1'],
        pos: [ -22.007373881453567, -47.895333294686985  ]
      },
      {
        code: '1-115',
        maps: ['ICMC1-1'],
        pos: [ -22.007363079382213, -47.8953339954925  ]
      },
      {
        code: '1-116',
        maps: ['ICMC1-1'],
        pos: [ -22.00733855184419, -47.89534801477051  ]
      },
      {
        code: '1-114',
        maps: ['ICMC1-1'],
        pos: [ -22.007362537695833, -47.89536184569649 ]
      },
      {
        code: '1-112',
        maps: ['ICMC1-1'],
        pos: [ -22.00737796922634, -47.895360844545756 ]
      },
      {
        code: '1-110',
        maps: ['ICMC1-1'],
        pos: [ -22.007427864508312, -47.89535760749171 ]
      },
      {
        code: '1-108',
        maps: ['ICMC1-1'],
        pos: [ -22.007440724117068, -47.89535677319943 ]
      }, //FIM - ICMC BLOCO 1 ANDAR 1 - 0 ~ 14 tuplas
         //INICIO - ICMC BLOCO 1 ANDAR 0 
        {
        code: '1-000',
        maps: ['ICMC1-0'],
        pos: [ -22.007488074779317, -47.89532588617154 ]
      },
      {
        code: '1-001',
        maps: ['ICMC1-0'],
        pos: [ -22.007581787837466, -47.89531211282601 ]
      },
      {
        code: '1-003',
        maps: ['ICMC1-0'],
        pos: [ -22.007653901703026, -47.8953281476412 ]
      },
      {
        code: '1-004',
        maps: ['ICMC1-0'],
        pos: [ -22.00764056326215, -47.89534854272235 ]
      },
      {
        code: '1-002',
        maps: ['ICMC1-0'],
        pos: [ -22.00756803506877, -47.89535324813081 ]
      },
      {
        code: '1-007',
        maps: ['ICMC1-0'],
        pos: [ -22.007439143761747, -47.89532787704743 ]
      },
      {
        code: '1-011',
        maps: ['ICMC1-0'],
        pos: [ -22.00738050394582, -47.895331681420224 ]
      },
      {
        code: '1-013',
        maps: ['ICMC1-0'],
        pos: [ -22.007371245027517, -47.895332282110665 ]
      },
      {
        code: '1-015',
        maps: ['ICMC1-0'],
        pos: [ -22.007341925119555, -47.89533418429706 ]
      },
      {
        code: '1-014',
        maps: ['ICMC1-0'],
        pos: [ -22.007305984369378, -47.89534716860012 ]
      },
      {
        code: '1-012',
        maps: ['ICMC1-0'],
        pos: [ -22.00733119250262, -47.89536447108704  ]
      },
      {
        code: '1-008',
        maps: ['ICMC1-0'],
        pos: [ -22.007348167186176, -47.89536336982123  ]
      },
      {
        code: '1-006',
        maps: ['ICMC1-0'],
        pos: [ -22.007454130362323, -47.89535649525285  ]
      },//FIM - ICMC BLOCO 1 ANDAR 0 - 15 ~ 27
        //INICIO - ICMC BLOCO 5 ANDAR 0 
      {
        code: '5-006',
        maps: ['ICMC5-0'],
        pos: [ -22.007454130362323, -47.89535649525285  ]
      }
    ];
    return {
      get: function (code) {
        var result = null;
        rooms.forEach(function(entry){
	  if(entry.code==code){
	    result = entry;
          }
        });
        return result;
      },
      find: function(term){
        var results = [];
        term = term.replace('-','');
        rooms.forEach(function(entry){
          cmp = entry.code.replace('-','');
          if(cmp.indexOf(term)>-1){
            results.push(entry);
          }
        });
        return results;

      }
    };
  })
;
