const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [0, 0],
  zoom: 1,
  projection: {
    type: 'globe' 
  }
});

map.on("load", () => {

  map.setPaintProperty('background', 'background-color', '#4cbdff');

  map.addSource("my-custom-data", {
    type: "geojson",
    data: globeView,
  });

  map.addLayer({
    id: "geojson-fill",
    type: "fill",
    source: "my-custom-data",
    paint: {
      "fill-color": "#000000",
      "fill-opacity": 0,
    },
  });

  map.addLayer({
    id: "geojson-border",
    type: "line",
    source: "my-custom-data",
    paint: {
      "line-color": "#000000",
      "line-width": 1,
    },
  });

  

  map.fitBounds(bounds, { padding: 50 });
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');