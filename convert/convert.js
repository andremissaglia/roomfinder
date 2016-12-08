require('numeric')
var a = {gps:{x:-22.007651,y:-47.895419},mapa:{x:29, y:551}};
var b = {gps:{x:-22.007564,y:-47.893725},mapa:{x:30, y:305}};
var c = {gps:{x:-22.007663,y:-47.902718},mapa:{x:1093, y:552}};

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
console.log(map2gps([971, 478]));