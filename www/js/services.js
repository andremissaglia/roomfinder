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
      },
      {
        code: 'ICMC5-1',
        andar: 1,
        bloco: 'ICMC5',
        src: 'img/mapas/icmc/ICMC5-1.svg',
        transform: [[2156265.3249765597, -202808.48097665157],
          [55678.866973500924, 1720799.5382485413]],
        p0: [-22.007313325060114, -47.895567656624124]
      },
      {
        code: 'ICMC4-0',
        andar: 0,
        bloco: 'ICMC4',
        src: 'img/mapas/icmc/ICMC4-T.svg',
        transform: [[-58927.41689472433, 1897198.124093346],
          [-1994299.9341986594, -19006.90403725006]],
        p0: [-22.007103606478264, -47.89459782037345]
      },
      {
        code: 'ICMC4-1',
        andar: 1,
        bloco: 'ICMC4',
        src: 'img/mapas/icmc/ICMC4-1.svg',
        transform: [[-58927.41689472433, 1897198.124093346],
          [-1994299.9341986594, -19006.90403725006]],
        p0: [-22.007103606478264, -47.89459782037345]
      },
      {
        code: 'ICMC4-2',
        andar: 2,
        bloco: 'ICMC4',
        src: 'img/mapas/icmc/ICMC4-2.svg',
        transform: [[-58927.41689472433, 1897198.124093346],
          [-1994299.9341986594, -19006.90403725006]],
        p0: [-22.007103606478264, -47.89459782037345]
      },
      {
        code: 'ICMC2-0',
        andar: 1,
        bloco: 'ICMC2',
        src: 'img/mapas/icmc/ICMC2-T.svg',
        transform: [[ -214347.80819513657, -2018441.6226043936 ],
         [ 2391561.2754328544, -62798.12023194608 ] ],
        p0: [ -22.00779122968385, -47.894598363362924 ]
      },
      {
        code: 'ICMC2-1',
        andar: 1,
        bloco: 'ICMC2',
        src: 'img/mapas/icmc/ICMC2-1.svg',
	      transform: [[ -214347.80819513657, -2018441.6226043936 ],
	       [ 2391561.2754328544, -62798.12023194608 ] ],
	      p0: [ -22.00779122968385, -47.894598363362924 ]
      },
      {
        code: 'ICMC2-2',
        andar: 2,
        bloco: 'ICMC2',
        src: 'img/mapas/icmc/ICMC2-2.svg',
        transform: [[ -214347.80819513657, -2018441.6226043936 ],
         [ 2391561.2754328544, -62798.12023194608 ] ],
        p0: [ -22.00779122968385, -47.894598363362924 ]
      },
      {
        code: 'ICMC2-3',
        andar: 3,
        bloco: 'ICMC2',
        src: 'img/mapas/icmc/ICMC2-3.svg',
        transform: [[ -214347.80819513657, -2018441.6226043936 ],
         [ 2391561.2754328544, -62798.12023194608 ] ],
        p0: [ -22.00779122968385, -47.894598363362924 ]
      },
      {
	code: 'ICMC3-0',
	andar: 0,
	bloco, 'ICMC3',
	src: 'img/mapa/icmc/ICMC3-T.svg',
	transform: [[ -62964.63682226217, 1684303.8940674686 ],
	 [ -1682811.4459484373, 15206.135952631372 ] ],
	p0: [ -22.00732936223415, -47.89467802798649 ]
      }
    ];
    var blocos = {};
    mapas.forEach(function (mapa) {
      if(!blocos[mapa.bloco]){
        blocos[mapa.bloco] = {};
      }
      blocos[mapa.bloco][mapa.andar] = mapa;
    });

    return {
      mapas: mapas,
      gps2map: function (mapa, ponto) {
        var px = ponto[0] - mapa.p0[0];
        var py = ponto[1] - mapa.p0[1];
        var x = mapa.transform[0][0] * px + mapa.transform[0][1] * py;
        var y = mapa.transform[1][0] * px + mapa.transform[1][1] * py;
        return [x, y];
      },
      getByCode: function(code){
      	var result = null;
        mapas.forEach(function(entry){
          if(entry.code==code){
            result = entry;
          }
        });
        return result;
      },
      getByLocation:function (bloco, andar) {
        if(!blocos[bloco]) return null;
        return blocos[bloco][andar];
      },
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
        code: '5-001',
        maps: ['ICMC5-0'],
        pos: [ -22.007085158129374, -47.89537048320777  ]
      },
      {
        code: '5-002',
        maps: ['ICMC5-0'],
        pos: [  -22.00691941609379, -47.895373521521435   ]
      },
      {
        code: '5-003',
        maps: ['ICMC5-0'],
        pos: [  -22.0070970076956, -47.89548167583964   ]
      },
      {
        code: '5-004',
        maps: ['ICMC5-0'],
        pos: [  -22.006929171839975, -47.895487106402626   ]
      }, //FIM - ICMC BLOCO 5 ANDAR 0 - 28 ~ 32
         //INICIO - ICMC BLOCO 5 ANDAR 1
       {
        code: '5-101',
        maps: ['ICMC5-1'],
        pos: [ -22.007085158129374, -47.89537048320777  ]
      },
      {
        code: '5-102',
        maps: ['ICMC5-1'],
        pos: [  -22.00691941609379, -47.895373521521435   ]
      },
      {
        code: '5-103',
        maps: ['ICMC5-1'],
        pos: [  -22.0070970076956, -47.89548167583964   ]
      },
      {
        code: '5-104',
        maps: ['ICMC5-1'],
        pos: [  -22.006929171839975, -47.895487106402626   ]
      }, //FIM - ICMC BLOCO 5 ANDAR 1 - 29 ~ 35
         //INICIO - ICMC BLOCO 4 ANDAR 0
      {
        code: '4-000',
        maps: ['ICMC4-0'],
        pos: [ -22.007228964575393, -47.89443989645009 ]
      },
      {
        code: '4-001',
        maps: ['ICMC4-0'],
        pos: [ -22.007230882069777, -47.89429131575974 ]
      },
      {
        code: '4-002',
        maps: ['ICMC4-0'],
        pos: [ -22.007257956249543, -47.89429162959701 ]
      },
      {
        code: '4-003',
        maps: ['ICMC4-0'],
        pos: [ -22.00723186638851, -47.894188036089496 ]
      },
      {
        code: '4-005',
        maps: ['ICMC4-0'],
        pos: [ -22.00723121034748, -47.89415164629028 ]
      },
      {
        code: '4-006',
        maps: ['ICMC4-0'],
        pos: [ -22.00738795275491, -47.8943309825551 ]
      },
      {
        code: '4-007A',
        maps: ['ICMC4-0'],
        pos: [ -22.007257507957394, -47.89412821681857 ]
      },
      {
        code: '4-007B',
        maps: ['ICMC4-0'],
        pos: [ -22.00729328972431, -47.89410929867162 ]
      },
      {
        code: '4-008',
        maps: ['ICMC4-0'],
        pos: [ -22.00730308524744, -47.89408113989661 ]
      },
      {
        code: '4-009',
        maps: ['ICMC4-0'],
        pos: [ -22.007383055454714, -47.894318707303 ]
      },
      {
        code: '4-010',
        maps: ['ICMC4-0'],
        pos: [ -22.007425013295112, -47.89428311400782 ]
      },
      {
        code: '4-011',
        maps: ['ICMC4-0'],
        pos: [ -22.00744404689556, -47.89428528647513  ]
      }, //FIM - ICMC BLOCO 4 ANDAR 0 - 36 ~ 47
         //INICIO - ICMC BLOCO 4 ANDAR 1
      {
        code: '4-101',
        maps: ['ICMC4-1'],
        pos: [ -22.007279227317458, -47.89447993541734  ]
      },
      {
        code: '4-102',
        maps: ['ICMC4-1'],
        pos: [ -22.00725966732614, -47.894480382065595  ]
      },
      {
        code: '4-103',
        maps: ['ICMC4-1'],
        pos: [ -22.007278399604527, -47.89451417075849 ]
      },
      {
        code: '4-104',
        maps: ['ICMC4-1'],
        pos: [ -22.00726086482414, -47.89451257193796 ]
      },
      {
        code: '4-105',
        maps: ['ICMC4-1'],
        pos: [ -22.007272143178493, -47.89453927690021 ]
      },
      {
        code: '4-106',
        maps: ['ICMC4-1'],
        pos: [ -22.007260613722423, -47.89453891879261 ]
      },
      {
        code: '4-107',
        maps: ['ICMC4-1'],
        pos: [ -22.007210923492273, -47.89443880899675 ]
      },
      {
        code: '4-108',
        maps: ['ICMC4-1'],
        pos: [-22.007186862018735, -47.894438061641765 ]
      },
      {
        code: '4-109',
        maps: ['ICMC4-1'],
        pos: [ -22.007181894410056, -47.89443316350897 ]
      },
      {
        code: '4-110',
        maps: ['ICMC4-1'],
        pos: [ -22.007181974762606, -47.89442473251548 ]
      },
      {
        code: '4-111',
        maps: ['ICMC4-1'],
        pos: [ -22.00720165528275, -47.89441163937699 ]
      },
      {
        code: '4-112',
        maps: ['ICMC4-1'],
        pos: [ -22.007231238634215, -47.89425390322613 ]
      },
      {
        code: '4-121',
        maps: ['ICMC4-1'],
        pos: [ -22.00717469210212, -47.89408400418555 ]
      },
      {
        code: '4-122',
        maps: ['ICMC4-1'],
        pos: [ -22.007180757690847, -47.89407892165337 ]
      },
      {
        code: '4-120',
        maps: ['ICMC4-1'],
        pos: [ -22.007205320445085, -47.89407968457825 ]
      },
      {
        code: '4-118',
        maps: ['ICMC4-1'],
        pos: [ -22.007215847339758, -47.89408001154606 ]
      },
      {
        code: '4-116',
        maps: ['ICMC4-1'],
        pos: [ -22.007252942111464, -47.89408116371833 ]
      },
      {
        code: '4-123',
        maps: ['ICMC4-1'],
        pos: [ -22.007291123896415, -47.89412609837902 ]
      },
      {
        code: '4-124',
        maps: ['ICMC4-1'],
        pos: [ -22.00726185191108, -47.89425116443011 ]
      },
      {
        code: '4-125',
        maps: ['ICMC4-1'],
        pos: [ -22.007261671117842, -47.89427013416546 ]
      },
      {
        code: '4-126',
        maps: ['ICMC4-1'],
        pos: [ -22.00729024411767, -47.89427102164951 ]
      },
      {
        code: '4-127',
        maps: ['ICMC4-1'],
        pos: [ -22.00730127229304, -47.89427136418721 ]
      },
      {
        code: '4-128',
        maps: ['ICMC4-1'],
        pos: [ -22.00731699278794, -47.894252877118625 ]
      },
      {
        code: '4-129',
        maps: ['ICMC4-1'],
        pos: [ -22.007335369424624, -47.894271369065926 ]
      },
      {
        code: '4-130',
        maps: ['ICMC4-1'],
        pos: [ -22.00734807219126, -47.89425384245215 ]
      },
      {
        code: '4-131',
        maps: ['ICMC4-1'],
        pos: [ -22.00735609268244, -47.89425409157048 ]
      },
      {
        code: '4-132',
        maps: ['ICMC4-1'],
        pos: [ -22.007361551527747, -47.894260059147356 ]
      },
      {
        code: '4-133',
        maps: ['ICMC4-1'],
        pos: [ -22.007361340602305, -47.894282190505265 ]
      },
      {
        code: '4-134',
        maps: ['ICMC4-1'],
        pos: [ -22.007361134698897, -47.89430379492608 ]
      },
      {
        code: '4-136',
        maps: ['ICMC4-1'],
        pos: [ -22.007360938839557, -47.89432434547271 ]
      },
      {
        code: '4-138',
        maps: ['ICMC4-1'],
        pos: [ -22.00736073293615, -47.89434594989353 ]
      },
      {
        code: '4-140',
        maps: ['ICMC4-1'],
        pos: [ -22.007360627473428, -47.89435701557248 ]
      },
      {
        code: '4-142',
        maps: ['ICMC4-1'],
        pos: [ -22.00735444637791, -47.894374217657806 ]
      },
      {
        code: '4-141',
        maps: ['ICMC4-1'],
        pos: [ -22.007344420763935, -47.894373906259894 ]
      },
      {
        code: '4-139',
        maps: ['ICMC4-1'],
        pos: [ -22.007340069942746, -47.894356904143855 ]
      },
      {
        code: '4-137',
        maps: ['ICMC4-1'],
        pos: [ -22.007340647476695, -47.89429630637815 ]
      },//FIM - ICMC BLOCO 4 ANDAR 1 - 48 ~ 83
        //INICIO - ICMC BLOCO 4 ANDAR 2
      {
        code: '4-201',
        maps: ['ICMC4-2'],
        pos: [ -22.007278721014725, -47.894480446784534 ]
      },
      {
        code: '4-202',
        maps: ['ICMC4-2'],
        pos: [ -22.00726067490957, -47.89447988626829 ]
      },
      {
        code: '4-203',
        maps: ['ICMC4-2'],
        pos: [ -22.00727891595133, -47.89451260551711 ]
      },
      {
        code: '4-204',
        maps: ['ICMC4-2'],
        pos: [ -22.007261371126873, -47.89451206057076 ]
      },
      {
        code: '4-205',
        maps: ['ICMC4-2'],
        pos: [ -22.007279161108276, -47.89453949487875 ]
      },
      {
        code: '4-206',
        maps: ['ICMC4-2'],
        pos: [ -22.007260628788526, -47.89453733798133 ]
      },
      {
        code: '4-207',
        maps: ['ICMC4-2'],
        pos: [ -22.00731525014202, -47.89443572428992 ]
      },
      {
        code: '4-209',
        maps: ['ICMC4-2'],
        pos: [ -22.007210422211575, -47.89443879342686 ]

      },
      {
        code: '4-211',
        maps: ['ICMC4-2'],
        pos: [ -22.007186862018735, -47.894438061641765 ]
      },
      {
        code: '4-213',
        maps: ['ICMC4-2'],
        pos: [ -22.00717683640476, -47.89443775024385 ]
      },
      {
        code: '4-214',
        maps: ['ICMC4-2'],
        pos: [ -22.007171447867933, -47.894424405547674 ]
      },
      {
        code: '4-212',
        maps: ['ICMC4-2'],
        pos: [ -22.00717752350073, -47.894418269141305 ]
      },
      {
        code: '4-210',
        maps: ['ICMC4-2'],
        pos: [ -22.00720108369357, -47.8944190009264 ]
      },
      {
        code: '4-208',
        maps: ['ICMC4-2'],
        pos: [ -22.007209605465448, -47.89441926561462 ]
      },
      {
        code: '4-215',
        maps: ['ICMC4-2'],
        pos: [ -22.007212540587332, -47.894269135252785 ]
      },
      {
        code: '4-217',
        maps: ['ICMC4-2'],
        pos: [ -22.007187977833095, -47.8942683723279 ]
      },
      {
        code: '4-219',
        maps: ['ICMC4-2'],
        pos: [ -22.00717795221912, -47.89426806092999 ]
      },
      {
        code: '4-221',
        maps: ['ICMC4-2'],
        pos: [ -22.00717306496299, -47.894254731803706 ]
      },
      {
        code: '4-220',
        maps: ['ICMC4-2'],
        pos: [ -22.007179140595788, -47.894248595397336 ]
      },
      {
        code: '4-218',
        maps: ['ICMC4-2'],
        pos: [ -22.007203703350026, -47.89424935832222 ]
      },
      {
        code: '4-216',
        maps: ['ICMC4-2'],
        pos: [ -22.0072132276833, -47.89424965415024 ]
      },
      {
        code: '4-235',
        maps: ['ICMC4-2'],
        pos: [ -22.007216172849255, -47.89409846991421 ]
      },
      {
        code: '4-237',
        maps: ['ICMC4-2'],
        pos: [ -22.00719010625292, -47.89409766027964 ]
      },
      {
        code: '4-239',
        maps: ['ICMC4-2'],
        pos:[ -22.007180080638946, -47.89409734888173 ]
      },
      {
        code: '4-241',
        maps: ['ICMC4-2'],
        pos:  [ -22.007174687080084, -47.894084531122644 ]
      },
      {
        code: '4-242',
        maps: ['ICMC4-2'],
        pos:  [ -22.00718126399358, -47.89407841028617 ]
      },
      {
        code: '4-240',
        maps: ['ICMC4-2'],
        pos:  [ -22.007205826747818, -47.894079173211054 ]
      },
      {
        code: '4-238',
        maps: ['ICMC4-2'],
        pos:  [ -22.007215852361792, -47.894079484608966 ]
      },
      {
        code: '4-236',
        maps: ['ICMC4-2'],
        pos:  [ -22.0072519445721, -47.89408060564145 ]
      },
      {
        code: '4-243',
        maps: ['ICMC4-2'],
        pos:  [ -22.007291113852347, -47.894127152253205 ]
      },
      {
        code: '4-222',
        maps: ['ICMC4-2'],
        pos:  [ -22.00727539151198, -47.8942510578802 ]
      },
      {
        code: '4-224',
        maps: ['ICMC4-2'],
        pos:  [ -22.007305468353902, -47.89425199207393 ]
      },
      {
        code: '4-226',
        maps: ['ICMC4-2'],
        pos:  [ -22.007338552880018, -47.89425301968704 ]
      },
      {
        code: '4-227',
        maps: ['ICMC4-2'],
        pos:  [ -22.007350583616788, -47.89425339336454 ]
      },
      {
        code: '4-228',
        maps: ['ICMC4-2'],
        pos:  [ -22.00736105024705, -47.89426004357746 ]
      },
      {
        code: '4-229',
        maps: ['ICMC4-2'],
        pos:  [ -22.0073608091894, -47.89428533655793 ]
      },
      {
        code: '4-231',
        maps: ['ICMC4-2'],
        pos:  [ -22.007360407426653, -47.894327491525374 ]
      },
      {
        code: '4-233',
        maps: ['ICMC4-2'],
        pos:  [ -22.007360306985966, -47.894338030267235 ]
      },
      {
        code: '4-234',
        maps: ['ICMC4-2'],
        pos:  [ -22.007354050559933, -47.894363136408955 ]
      },
      {
        code: '4-232B',
        maps: ['ICMC4-2'],
        pos:  [ -22.007341518542464, -47.894362747161566 ]
      },
      {
        code: '4-232A',
        maps: ['ICMC4-2'],
        pos:  [ -22.007341764622147, -47.894336927244005 ]
      },
      {
        code: '4-230B',
        maps: ['ICMC4-2'],
        pos:  [ -22.007341875106903, -47.89432533462796 ]
      },
      {
        code: '4-230A',
        maps: ['ICMC4-2'],
        pos:  [ -22.007338362042713, -47.89427304329658 ]
      },
      {
        code: '4-225',
        maps: ['ICMC4-2'],
        pos:  [ -22.007306280077994, -47.89427204682326 ]
      },
      {
        code: '4-223',
        maps: ['ICMC4-2'],
        pos:  [ -22.00726016225371, -47.894270614392866 ]
      }//FIM - ICMC BLOCO 4 ANDAR 2 - 84 ~ 128

    ];
        pos: [ -22.007454130362323, -47.89535649525285  ]
      },
      //INICIO - ICMC BLOCO 2 (BIBLIOTECA)
      {
        code: '24h',
        maps: ['ICMC2-0'],
        pos: [ -22.00760620827212, -47.8948612686301 ]
      },
      {
        code: '2-001',
        maps: ['ICMC2-0'],
        pos: [ -22.00760711638041, -47.894895852414045 ] 
      },
      //FIM - ICMC BLOCO 2 (BIBLIOTECA) 0 29 ~ 30
      //INICIO - ICMC BLOCO 2 (BIBLIOTECA) 1
      {
        code: '2-101',
        maps: ['ICMC2-1'],
        pos: [ -22.0076297718096,-47.89470765963337]
      },
      {
        code: '2-106',
        maps: ['ICMC2-1'],
        pos: [ -22.007639449448714,-47.894853279707775]
      },
      {
        code: '2-107',
        maps: ['ICMC2-1'],
        pos: [ -22.007641849449197,-47.894944679708196]
      },
      {
        code: '2-110',
        maps: ['ICMC2-1'],
        pos: [ -22.00764434026051,-47.89503953808701]
      },
      {
        code: '2-111',
        maps: ['ICMC2-1'],
        pos: [ -22.0076452483688,-47.895074121870955]
      },
      {
        code: '2-112',
        maps: ['ICMC2-1'],
        pos: [ -22.007646169450066,-47.895109199708955]
      },
      //FIM - ICMC BLOCO 2 (BIBLIOTECA) 1
      //INICIO - ICMC BLOCO 2 (BIBLIOTECA) 2
      {
        code: '2-201',
        maps: ['ICMC2-2'],
        pos: [ -22.007634751392604,-47.89469028614963 ]
      },
      {
        code: '2-202',
        maps: ['ICMC2-2'],
        pos: [ -22.007635659500895,-47.894724869933576 ]
      },
      {
        code: '2-203',
        maps: ['ICMC2-2'],
        pos: [ -22.007636567609186,-47.89475945371752 ]
      },
      {
        code: '2-204',
        maps: ['ICMC2-2'],
        pos: [ -22.007647533150443,-47.89481080499719 ]
      },
      {
        code: '2-206',
        maps: ['ICMC2-2'],
        pos: [ -22.007639032474547,-47.89485332398822 ]
      },
      {
        code: '2-207',
        maps: ['ICMC2-2'],
        pos: [ -22.007641160042542,-47.89493434885346 ]
      },
      {
        code: '2-208',
        maps: ['ICMC2-2'],
        pos: [ -22.00764208112381,-47.89496942669146 ]
      },
      {
        code: '2-209',
        maps: ['ICMC2-2'],
        pos: [ -22.007643002205075,-47.89500450452946 ]
      },
      {
        code: '2-210',
        maps: ['ICMC2-2'],
        pos: [ -22.00764392328634,-47.89503958236746 ]
      },
      {
        code: '2-211',
        maps: ['ICMC2-2'],
        pos: [ -22.007644844367608,-47.89507466020546 ]
      },
      {
        code: '2-212',
        maps: ['ICMC2-2'],
        pos: [ -22.0076457524759,-47.8951092439894 ]
      },
      //FIM - ICMC BLOCO 2 (BIBLIOTECA) 2
      //INICIO - ICMC BLOCO 2 (BIBLIOTECA) 3
      {
        code: '2-301',
        maps: ['ICMC2-3'],
        pos: [ -22.0076297718096,-47.89470765963337 ]
      },
      {
        code: '2-302',
        maps: ['ICMC2-3'],
        pos: [ -22.007637501663428,-47.894795025609575 ]
      },
      {
        code: '2-305',
        maps: ['ICMC2-3'],
        pos: [ -22.007638422744694,-47.894830103447575 ]
      },
      {
        code: '2-306',
        maps: ['ICMC2-3'],
        pos: [ -22.007639032474547,-47.89485332398822 ]
      },
      {
        code: '2-307',
        maps: ['ICMC2-3'],
        pos: [ -22.00764084869113,-47.89492249155611 ]
      },
      {
        code: '2-309',
        maps: ['ICMC2-3'],
        pos: [ -22.007643002205075,-47.89500450452946 ]
      },
      {
        code: '2-310',
        maps: ['ICMC2-3'],
        pos: [ -22.00764392328634,-47.89503958236746 ]
      },
      {
        code: '2-311',
        maps: ['ICMC2-3'],
        pos: [ -22.007644831394632,-47.8950741661514 ]
      },
      {
        code: '2-312',
        maps: ['ICMC2-3'],
        pos: [ -22.0076457524759,-47.8951092439894 ]
      },
      {
        code: '3-001',
        maps: ['ICMC3-0'],
        pos: [-22.007560757074675,-47.894440879388]
      },
      {
        code: '3-002',
        maps: ['ICMC3-0'],
        pos: [-22.007464195367536,-47.89447408006359]
      },
      {
        code: '3-003a',
        maps: ['ICMC3-0'],
        pos: [-22.007467866843772,-47.89435428646367]
      },
      {
        code: '3-003b',
        maps: ['ICMC3-0'],
        pos: [-22.007516768185827,-47.89443923494342]
      },
      {
        code: '3-004a',
        maps: ['ICMC3-0'],
        pos: [-22.00742994835915,-47.894498329636185]
      },
      {
        code: '3-004b',
        maps: ['ICMC3-0'],
        pos: [-22.007457887248012,-47.894499374080716]
      },
      {
        code: '3-005',
        maps: ['ICMC3-0'],
        pos: [-22.007399606438074,-47.89429711270067]
      },
      {
        code: '3-006',
        maps: ['ICMC3-0'],
        pos: [SMA -22.007636584256264,-47]
      },.894480524508566
      {
        code: '3-006',
        maps: ['ICMC3-0'],
        pos: [SSC-22.007643740319015,-47]
      },.89454906948985
      {
        code: '3-006',
        maps: ['ICMC3-0'],
        pos: [SCC-22.007650825351778,-47]
      },.894543990897134
      {
        code: '3-006',
        maps: ['ICMC3-0'],
        pos: [SME-22.007650696550275,-47]
      },.89452973687206
      {
        code: '3-008',
        maps: ['ICMC3-0'],
        pos: [-22.007597194025312,-47.8943959315844]
      },
      {
        code: '3-009',
        maps: ['ICMC3-0'],
        pos: [-22.007619365571802,-47.89441635309117]
      },
      {
        code: '3-010',
        maps: ['ICMC3-0'],
        pos: [-22.007618533728763,-47.89432429584589]
      },
      {
        code: '3-011',
        maps: ['ICMC3-0'],
        pos: [-22.00761795948873,-47.894260746650765]
      },
      {
        code: '3-012',
        maps: ['ICMC3-0'],
        pos: [-22.00761712764569,-47.89416868940549]
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
