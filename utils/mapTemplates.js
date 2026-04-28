/**
 * Leaflet Map Templates
 * These functions generate the HTML and JS needed to render OpenStreetMap via WebView.
 */

const COMMON_HEAD = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
    </style>
`;

export const getLocationMapHtml = (lat, lon) => `
    <!DOCTYPE html>
    <html>
    <head>${COMMON_HEAD}</head>
    <body>
        <div id="map"></div>
        <script>
            var map = L.map('map').setView([${lat}, ${lon}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([${lat}, ${lon}]).addTo(map).bindPopup('Você está aqui');
        </script>
    </body>
    </html>
`;

export const getRouteMapHtml = (startLat, startLon, destLat, destLon, geometry) => `
    <!DOCTYPE html>
    <html>
    <head>${COMMON_HEAD}</head>
    <body>
        <div id="map"></div>
        <script>
            var map = L.map('map').setView([${destLat}, ${destLon}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([${startLat}, ${startLon}]).addTo(map).bindPopup('Início');
            L.marker([${destLat}, ${destLon}]).addTo(map).bindPopup('Destino');

            var routeLine = L.geoJSON(${geometry}, {
                style: { color: 'blue', weight: 5 }
            }).addTo(map);
            
            map.fitBounds(routeLine.getBounds());
        </script>
    </body>
    </html>
`;
