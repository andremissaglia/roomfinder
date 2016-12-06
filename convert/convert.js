require('numeric')
var a = {gps:{x:-22.007402,y:-47.894562},mapa:{x:200, y:124}};
var b = {gps:{x:-22.007509,y:-47.894566},mapa:{x:200, y:304}};
var c = {gps:{x:-22.007506,y:-47.894234},mapa:{x:759, y:304}};

//vetores auxiliares do mapa
var mva = [b.mapa.x-a.mapa.x, b.mapa.y-a.mapa.y];
var mvb = [c.mapa.x-a.mapa.x, c.mapa.y-a.mapa.y];

//vetores auxiliares do gps
var gva = [b.gps.x-a.gps.x, b.gps.y-a.gps.y];
var gvb = [c.gps.x-a.gps.x, c.gps.y-a.gps.y];

var M = numeric.inv(numeric.transpose([mva, mvb]));

// Posicoes (0,0), (1,0) e (0,1) relativas à a
var ap0 = [-a.mapa.x, -a.mapa.y];
var apx = [ap0[0]+1, ap0[1]];
var apy = [ap0[0], ap0[1]+1];

// ap0, apx e apy em relação aos versores mva e mvb
var vp0 = numeric.dot(M,ap0);
var vpx = numeric.dot(M,apx);
var vpy = numeric.dot(M,apy);

// Posicoes (0,0), (1,0) e (0,1) em coordenadas gps
var gp0 = numeric.add(numeric.dot(vp0[0],gva),numeric.dot(vp0[1],gvb));
gp0 = numeric.add(gp0, [a.gps.x, a.gps.y]);
var gpx = numeric.add(numeric.dot(vpx[0],gva),numeric.dot(vpx[1],gvb));
gpx = numeric.add(gpx, [a.gps.x, a.gps.y]);
var gpy = numeric.add(numeric.dot(vpy[0],gva),numeric.dot(vpy[1],gvb));
gpy = numeric.add(gpy, [a.gps.x, a.gps.y]);

//base do mapa nas coordenadas gps
var gvx = numeric.sub(gpx, gp0);
var gvy = numeric.sub(gpy, gp0);

var Mp = numeric.transpose([gvx, gvy]);
var M = numeric.inv(Mp);

var gps2map = function(gps_pos){
	rel = numeric.sub(gps_pos, gp0);
	var pos = numeric.dot(M, rel);
	return pos;
}
var map2gps = function(map_pos){
	var pos = numeric.dot(Mp, map_pos);
	return numeric.add(pos, gp0);
}
console.log({transform:M, p0: gp0});
console.log('3-001 ' + map2gps([414,393]));
console.log('3-002 ' + map2gps([352,230]));
console.log('3-003a ' + map2gps([554,238]));
console.log('3-003b ' + map2gps([414,319]));
console.log('3-004a ' + map2gps([309,172]));
console.log('3-004b ' + map2gps([309,219]));
console.log('3-005 ' + map2gps([646,124]));
console.log('3-006 SMA ' + map2gps([352,520]));
console.log('3-006 SSC' + map2gps([237,531]));
console.log('3-006 SCC' + map2gps([246,543]));
console.log('3-006 SME' + map2gps([270,543]));
console.log('3-008 ' + map2gps([492,455]));
console.log('3-009 ' + map2gps([459,492]));
console.log('3-010 ' + map2gps([614,492]));
console.log('3-011 ' + map2gps([721,492]));
console.log('3-012 ' + map2gps([876,492]));
>>>>>>> Stashed changes
