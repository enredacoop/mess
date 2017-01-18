var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
            maxZoom: 18,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
            }),
    latlng = L.latLng(37.32, -5.95);

var map = L.map('map', {center: latlng, zoom: 11, layers: [tiles]});

var markers = L.markerClusterGroup();
var organizacionesLayer = L.geoJson(organizaciones);
keys = Object.keys(organizacionesLayer._layers);
for(k=0;k<keys.length;k++) {
    var el = organizacionesLayer._layers[keys[k]];
    var elprop = el.feature.properties;
    var marker = L.marker(
            el._latlng,
            {
                name: elprop.Nombre,
                type: elprop.Tipo_Entidad,
                district: elprop.Distrito,
                address: elprop.Direccion,
                phone: elprop.Telefonos,
                mail: elprop.Mail
            }
        ).on('click', function(e) {
            $('#orgname').text(e.target.options.name);
            $('#orgtype').text(e.target.options.type);
            $('#orgdistrict').text(e.target.options.district);
            $('#orgaddress').text(e.target.options.address);
            $('#orgphone').text(e.target.options.phone);
            $('#orgmail').text(e.target.options.mail);
            map.panTo(e.latlng);
        });
    markers.addLayer(marker);
}

map.fitBounds(organizacionesLayer.getBounds());
map.addLayer(markers);

$('#close').click(function() {
    $('#content-box').hide();
});
