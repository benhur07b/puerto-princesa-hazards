$(document).ready(function() {

    var osm_mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	maxZoom: 19,
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var flood = new L.GeoJSON.AJAX("data/flood.geojson", {
        style: function(feature) {
            switch (feature.properties.FloodSusc) {
                case 'HF':   return {color: "#0000fe", fillOpacity: 0.7, weight: 1};
                case 'LF':   return {color: "#75cff0", fillOpacity: 0.7, weight: 1};
                case 'MF':   return {color: "#c896ff", fillOpacity: 0.7, weight: 1};
                case 'VHF':  return {color: "#00064d", fillOpacity: 0.7, weight: 1};
            }
        }
    });
    var landslide = new L.GeoJSON.AJAX("data/landslide.geojson", {
        style: function(feature) {
            switch (feature.properties.LndslideSu) {
                case 'VHL':  return {color: "#750000", fillOpacity: 0.7, weight: 1};
                case 'HL':   return {color: "#e31a1c", fillOpacity: 0.7, weight: 1};
                case 'ML':   return {color: "#33a02c", fillOpacity: 0.7, weight: 1};
                case 'LL':   return {color: "#ffff01", fillOpacity: 0.7, weight: 1};
            }
        }
    });
    var storm_surge = new L.GeoJSON.AJAX("data/storm-surge.geojson", {
        style: function(feature) {
            switch (feature.properties.HAZ) {
                case 3:   return {color: "#e31a1c", fillOpacity: 0.7, weight: 1};
                case 2:   return {color: "#ff7f00", fillOpacity: 0.7, weight: 1};
                case 1:   return {color: "#effb08", fillOpacity: 0.7, weight: 1};
                default:  return {color: "#cf4320", fillOpacity: 0.7, weight: 1};
            }
        }
    });
    var tsunami = new L.GeoJSON.AJAX("data/tsunami.geojson", {
        style: {
            fillOpacity: 0.7,
            weight: 1,
        }
    });
    var barangays = new L.GeoJSON.AJAX("data/barangays.geojson", {
        style: {
            fillColor: "#ffffff",
            fillOpacity: 0.0,
            color: '#000000',
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
        "Flood": flood,
        "Landslide": landslide,
        "Storm Surge": storm_surge,
        "Tsunami": tsunami,
        "Barangays": barangays,
        "Building Footprints": building_footprints,
    }

    var map = L.map('map', {
        center: [9.830, 118.745],
        zoom: 10,
        layers: [osm_mapnik, flood, landslide, storm_surge, tsunami, building_footprints, barangays,]
    });

    L.control.layers(basemaps, overlays).addTo(map);

    map.invalidateSize();

})
