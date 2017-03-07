var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
            maxZoom: 18,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
            }),
    latlng = L.latLng(37.32, -5.95);

var map = L.map('map', {center: latlng, zoom: 11, layers: [tiles]});

var mcg = L.markerClusterGroup(),
            // use `L.featureGroup.subGroup(parentGroup)` instead of `L.featureGroup()` or `L.layerGroup()
            distritoRemedios = L.featureGroup.subGroup(mcg),
            distritotriana = L.featureGroup.subGroup(mcg),
            distritoSur = L.featureGroup.subGroup(mcg),
            distritoCascoAntiguo = L.featureGroup.subGroup(mcg),
            distritoMacarena = L.featureGroup.subGroup(mcg),
            distritoCerroAmate = L.featureGroup.subGroup(mcg),
            distritoBellavistaLaPalmera = L.featureGroup.subGroup(mcg),
            distritoNorte = L.featureGroup.subGroup(mcg),
            distritoEsteAlcosaTorreblanca = L.featureGroup.subGroup(mcg),
            distritoSanPabloSantaJusta = L.featureGroup.subGroup(mcg),
            distritoNervion = L.featureGroup.subGroup(mcg),
            distritoOtro = L.featureGroup.subGroup(mcg),
            grupoCooperativas = L.featureGroup.subGroup(mcg), 
            grupoSociedadesLaborales = L.featureGroup.subGroup(mcg),
            grupoAsociaciones = L.featureGroup.subGroup(mcg),
            grupoFundaciones = L.featureGroup.subGroup(mcg),
            grupoResto = L.featureGroup.subGroup(mcg),
            distritoTriana = L.featureGroup.subGroup(mcg),
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
        marker.addTo(filtroPorTipo(elprop));
        marker.addTo(filtroPorDistrito(elprop));
}

function filtroPorDistrito(element) {
    switch (element.Distrito) {
        case 'Los Remedios':
            filtro = distritoRemedios;
            break;
        case 'Triana':
            filtro = distritoTriana;
            break;
        case 'Sur':
            filtro = distritoSur;
            break;
        case 'Casco Antiguo':
            filtro = distritoCascoAntiguo;
            break;
        case 'Macarena':
            filtro = distritoMacarena;
            break;
        case 'Cerro-Amate':
            filtro = distritoCerroAmate;
            break;
        case 'Bellavista-La Palmera':
            filtro = distritoBellavistaLaPalmera;
            break;
        case 'Norte':
            filtro = distritoNorte;
            break;
        case 'Este-Alcosa-Torreblanca':
            filtro = distritoEsteAlcosaTorreblanca;
            break;
        case 'San Pablo-Santa Justa':
            filtro = distritoSanPabloSantaJusta;
            break;
        case 'Nervión':
            filtro = distritoNervion
            break;
        default:
            filtro = distritoOtro;
        }
    return filtro;
}

function filtroPorTipo(element) {
    switch (element.Tipo_Entidad) {
        case 'Cooperativa':
            filtro = grupoCooperativas;
            break;
        case 'Sociedad Laboral':
            filtro = grupoSociedadesLaborales;
            break;
        case 'Asociación':
            filtro = grupoAsociaciones;
            break;
        case 'Fundación':
            filtro = grupoFundaciones;
            break;
        default:
            filtro = grupoResto;
        }
    return filtro;
}

control.addOverlay(distritoRemedios, "DISTRITO: Los Remedios");
control.addOverlay(distritoTriana, "DISTRITO: Triana");
control.addOverlay(distritoSur, "DISTRITO: Sur");
control.addOverlay(distritoCascoAntiguo, "DISTRITO: Casco Antiguo");
control.addOverlay(distritoMacarena, "DISTRITO: Macarena");
control.addOverlay(distritoCerroAmate, "DISTRITO: Cerro-Amate");
control.addOverlay(distritoBellavistaLaPalmera, "DISTRITO: Bellavista-La Palmera");
control.addOverlay(distritoNorte, "DISTRITO: Norte");
control.addOverlay(distritoEsteAlcosaTorreblanca, "DISTRITO: Este-Alcosa-Torreblanca");
control.addOverlay(distritoSanPabloSantaJusta, "DISTRITO: San Pablo-Santa Justa");
control.addOverlay(distritoNervion, "DISTRITO: Nervión");
control.addOverlay(distritoOtro, "DISTRITO: No detectado");


control.addOverlay(grupoCooperativas, "TIPO: Cooperativas");
control.addOverlay(grupoSociedadesLaborales, "TIPO: Sociedades laborales");
control.addOverlay(grupoAsociaciones, "TIPO: Asociaciones");
control.addOverlay(grupoFundaciones, "TIPO: Fundaciones");
control.addOverlay(grupoResto, "TIPO: No catalogadas");
control.addTo(map);

distritoRemedios.addTo(map);
distritoTriana.addTo(map);
distritoSur.addTo(map);
distritoCascoAntiguo.addTo(map);
distritoMacarena.addTo(map);
distritoCerroAmate.addTo(map);
distritoBellavistaLaPalmera.addTo(map);
distritoNorte.addTo(map);
distritoEsteAlcosaTorreblanca.addTo(map);
distritoSanPabloSantaJusta.addTo(map);
distritoNervion.addTo(map);
distritoOtro.addTo(map);

grupoCooperativas.addTo(map);
grupoSociedadesLaborales.addTo(map);
grupoAsociaciones.addTo(map);
grupoFundaciones.addTo(map);
grupoResto.addTo(map);

map.fitBounds(organizacionesLayer.getBounds());
map.addLayer(mcg);


var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    // loop through our density intervals and generate a label with a colored square for each interval
    var str = "<ul class='list-unstyled'><li><i style='background-color: rgb(241, 128, 23);'></i> Densidad alta</li>";
    str += "<li><i style='background-color: rgb(240, 194, 12);'></i> Densidad media</li>";
    str += "<li><i style='background-color: rgb(110, 204, 57);'></i> Densidad baja</li></ul>";
    div.innerHTML = str;
    return div;
}
legend.addTo(map);
