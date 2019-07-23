mapboxgl.accessToken = 'pk.eyJ1IjoibmFzc2FjYXJpdGFzIiwiYSI6ImNqa2FweGhqcTF2dm4zd24xa2w0c3pzNDkifQ.IIEkXeNO8hhuQZu-Mw7Frg';

$(document).ready(function(){

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [118.745, 9.830],
        zoom: 9,
        minZoom: 7,
        maxZoom: 18,
        // maxBounds: [[124.95, 11.03], [125.05, 11.08]]
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    map.on('load', function () {

        map.addSource(
            'tsunami', {
                type: 'geojson',
                data: 'data/tsunami.geojson',
            }
        );

        map.addSource(
            'barangays', {
                type: 'geojson',
                data: 'data/barangays.geojson',
            }
        );

        map.addSource(
            'building-footprints', {
                type: 'geojson',
                data: 'data/building-footprints.geojson',
            }
        );

        map.addLayer({
            'id': 'tsunami_puerto-princesa',
            'type': 'fill',
            'source': 'tsunami',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': 'blue',
                'fill-outline-color': 'blue',
            }
        });

        map.addLayer({
            'id': 'barangays_puerto-princesa',
            'type': 'line',
            'source': 'barangays',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': 'black',
            }
        });

        map.addLayer({
            'id': 'building-footprints_puerto-princesa',
            'type': 'fill-extrusion',
            'source': 'building-footprints',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                // 'fill-extrusion-color': 'red',
                'fill-extrusion-color': 'red',
                'fill-extrusion-opacity': 0.75,
                'fill-extrusion-height': 20,
            },
        });


    });

    map.resize();

    var toggleableLayerIds = [ 'Barangays', 'Tsunami', 'Building Footprints' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
        var clickedLayer = this.textContent.split(" ").join("-").toLowerCase() + '_puerto-princesa';
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
        } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
    }

});
