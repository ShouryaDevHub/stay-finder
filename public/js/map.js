const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [78.9629, 20.5937],
  zoom: 6,
});

const marker = new maplibregl.Marker().setLngLat([77.2167, 28.6448]).addTo(map);
