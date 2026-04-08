const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

L.geoJSON(myData).addTo(map);

const map2 = new maplibregl.Map({
  container: "map2",
  style: "https://demotiles.maplibre.org/style.json",
  center: [0, 0],
  zoom: 1,
  projection: 'globe'
});

map2.on("load", () => {
  map2.addSource("my-custom-data", {
    type: "geojson",
    data: myData,
  });

  map2.addLayer({
    id: "geojson-fill",
    type: "fill",
    source: "my-custom-data",
    paint: {
      "fill-color": "#ff0000",
      "fill-opacity": 0.4,
    },
  });

  map2.addLayer({
    id: "geojson-border",
    type: "line",
    source: "my-custom-data",
    paint: {
      "line-color": "#000000",
      "line-width": 1,
    },
  });

  const bounds = new maplibregl.LngLatBounds();

  myData.features.forEach((feature) => {
    const coords = feature.geometry.coordinates;
    coords.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach((coord) => {
          bounds.extend(coord);
        });
      });
    });
  });

  map2.fitBounds(bounds, { padding: 50 });
});

map2.addControl(new maplibregl.NavigationControl(), 'top-right');