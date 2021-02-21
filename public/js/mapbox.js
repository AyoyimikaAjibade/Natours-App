export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXlveWltaWthIiwiYSI6ImNra2NremQ5bDAycjgyb3F1ZmQ2bGo5amsifQ.17VR-2CEdUffR_HcZJQ0qQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ayoyimika/ckkclzcs70e4a18pgasqep80v',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
