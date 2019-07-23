$(document).ready(function() {

    var osm_mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	maxZoom: 19,
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var barangays = new L.GeoJSON.AJAX("data/barangays.geojson", {
        style: {
            fillColor: "#ffffff",
            fillOpacity: 0.0,
            color: '#000000',
            weight: 1,
        }
    });
    var tsunami = new L.GeoJSON.AJAX("data/tsunami.geojson", {
        style: {
            fillOpacity: 0.7,
            weight: 1,
        }
    });
    var building_footprints = new L.GeoJSON.AJAX("data/building-footprints.geojson", {
        style: {
            fillColor: "#ff0000",
            fillOpacity: 0.9,
            color: '#ff0000',
            weight: 1,
        }
    });

    var basemaps = {
        "OSM Mapnik": osm_mapnik,
    }

    var overlays = {
        "Barangays": barangays,
        "Tsunami": tsunami,
        "Building Footprints": building_footprints,
    }

    var map = L.map('map', {
        center: [9.830, 118.745],
        zoom: 10,
        layers: [osm_mapnik, barangays, tsunami, building_footprints]
    });

    L.control.layers(basemaps, overlays).addTo(map);

    map.invalidateSize();

})
