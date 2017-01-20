var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
            maxZoom: 18,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
            }),
    latlng = L.latLng(37.32, -5.95);

var map = L.map('map', {center: latlng, zoom: 11, layers: [tiles]});

var mcg = L.markerClusterGroup(),
            grupoCooperativas = L.featureGroup.subGroup(mcg), // use `L.featureGroup.subGroup(parentGroup)` instead of `L.featureGroup()` or `L.layerGroup()`!
            grupoSociedadesLaborales = L.featureGroup.subGroup(mcg),
            grupoAsociaciones = L.featureGroup.subGroup(mcg),
            grupoFundaciones = L.featureGroup.subGroup(mcg),
            grupoResto = L.featureGroup.subGroup(mcg),
            control = L.control.layers(null, null, { collapsed: false  });

mcg.addTo(map);

var organizacionesLayer = L.geoJson(
    organizaciones,
    {
        onEachFeature: function() {}
    }
);

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
    // mcg.addLayer(marker);
        marker.addTo(elprop.Tipo_Entidad == 'Cooperativa' ? grupoCooperativas : elprop.Tipo_Entidad == 'Sociedad Laboral' ? grupoSociedadesLaborales : elprop.Tipo_Entidad == 'Asociación' ? grupoAsociaciones : elprop.Tipo_Entidad == 'Fundación' ? grupoFundaciones : grupoResto);
}

control.addOverlay(grupoCooperativas, "Cooperativas");
control.addOverlay(grupoSociedadesLaborales, "Sociedades laborales");
control.addOverlay(grupoAsociaciones, "Asociaciones");
control.addOverlay(grupoFundaciones, "Fundaciones");
control.addOverlay(grupoResto, "Otras");
control.addTo(map);

grupoCooperativas.addTo(map);
grupoSociedadesLaborales.addTo(map);
grupoAsociaciones.addTo(map);
grupoFundaciones.addTo(map);
grupoResto.addTo(map);

map.fitBounds(organizacionesLayer.getBounds());
map.addLayer(mcg);

$('#close').click(function() {
    $('#content-box').hide();
});
