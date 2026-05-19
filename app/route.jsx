// ============================================================
// Planejador de Rotas — Nominatim (geocoding) + OSRM + Leaflet via WebView
//
// Dependências:
//   npx expo install expo-location        (~19.0.8)
//   npx expo install react-native-webview (^13.15.0)
//
// APIs externas (gratuitas, sem chave):
//   Nominatim: https://nominatim.openstreetmap.org (requer User-Agent)
//   OSRM:      https://router.project-osrm.org
// ============================================================

// Import React and hooks for state and lifecycle management
import React, { useEffect, useState } from 'react';
// Import UI components for a professional form and layout
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
// Import expo-location to get the starting point of the route
import * as Location from 'expo-location';
// Import WebView to render the route on a map
import { WebView } from 'react-native-webview';

// The main component for the Route Planner screen
export default function RouteScreen() {
    // State to hold the coordinates of the starting point (user's current location)
    const [startLoc, setStartLoc] = useState(null);
    // State to hold the destination address typed by the user
    const [destAddress, setDestAddress] = useState('');
    // State to show a loading spinner while calculating the route
    const [loading, setLoading] = useState(false);
    // State to store the generated HTML map once the route is ready
    const [mapHtml, setMapHtml] = useState(null);
    // State to handle any errors (e.g., address not found)
    const [error, setError] = useState(null);

    // UseEffect runs on mount to get the user's current location as the start point
    useEffect(() => {
        (async () => {
            // Ask for permission to access GPS
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão de localização negada');
                return;
            }
            // Get the current position once
            let loc = await Location.getCurrentPositionAsync({});
            setStartLoc(loc.coords);
        })();
    }, []);

    // This function handles the logic of turning an address into a route on a map
    const createRoute = async () => {
        if (!startLoc || !destAddress) return;
        setLoading(true);
        setError(null);

        try {
            console.log('Starting route creation for:', destAddress);
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destAddress)}`, {
                headers: { 'User-Agent': 'DDMI-RoutePlanner-App' }
            });
            
            if (!geoRes.ok) throw new Error(`Geocoding failed: ${geoRes.status}`);

            let geoData;
            try {
                geoData = await geoRes.json();
            } catch (e) {
                const text = await geoRes.text();
                console.error('Geocoding JSON parse error. Response text:', text);
                throw new Error(`Invalid JSON from Geocoder: ${text.substring(0, 50)}`);
            }
            
            console.log('Geocoding result:', geoData);
            if (!geoData || geoData.length === 0) throw new Error('Endereço não encontrado');
            
            const dest = geoData[0];
            const destLat = dest.lat;
            const destLon = dest.lon;

            console.log(`Requesting route from ${startLoc.latitude},${startLoc.longitude} to ${destLat},${destLon}`);
            const routeRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLoc.longitude},${startLoc.latitude};${destLon},${destLat}?overview=full&geometries=geojson`);
            
            if (!routeRes.ok) throw new Error(`Routing failed: ${routeRes.status}`);

            let routeData;
            try {
                routeData = await routeRes.json();
            } catch (e) {
                const text = await routeRes.text();
                console.error('Routing JSON parse error. Response text:', text);
                throw new Error(`Invalid JSON from Router: ${text.substring(0, 50)}`);
            }

            console.log('Routing result:', routeData);
            if (routeData.code !== 'Ok') throw new Error('Não foi possível calcular a rota');
            const geometry = JSON.stringify(routeData.routes[0].geometry);

            // 3. Map Generation: Build a Leaflet HTML page to display the route

            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                    <style>
                        body { margin: 0; padding: 0; }
                        #map { height: 100vh; width: 100vw; }
                    </style>
                </head>
                <body>
                    <div id="map"></div>
                    <script>
                        // Initialize map centered on the destination
                        var map = L.map('map').setView([${destLat}, ${destLon}], 13);
                        // Load OpenStreetMap tiles
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '© OpenStreetMap contributors'
                        }).addTo(map);

                        // Add markers for Start and End points
                        L.marker([${startLoc.latitude}, ${startLoc.longitude}]).addTo(map).bindPopup('Início');
                        L.marker([${destLat}, ${destLon}]).addTo(map).bindPopup('Destino');

                        // Draw the route line using the geometry we got from OSRM
                        var routeLine = L.geoJSON(${geometry}, {
                            style: { color: 'blue', weight: 5 }
                        }).addTo(map);
                        
                        // Automatically zoom and pan the map to fit the entire route
                        map.fitBounds(routeLine.getBounds());
                    </script>
                </body>
                </html>
            `;
            setMapHtml(html); // Set the final HTML to trigger the map view
        } catch (e) {
            setError(e.message); // Catch and display any errors that happened
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };

    return (
        <View style={styles.container}>
            {/* If the map hasn't been generated yet, show the input form */}
            {!mapHtml ? (
                <View style={styles.form}>
                    <Text style={styles.label}>Destino:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={destAddress} 
                        onChangeText={setDestAddress} 
                        placeholder="Digite o endereço..."
                    />
                    <TouchableOpacity style={styles.button} onPress={createRoute}>
                        {/* Show a spinner while calculating, otherwise show the button text */}
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Traçar Rota</Text>}
                    </TouchableOpacity>
                    {/* Show error message if something went wrong */}
                    {error && <Text style={styles.error}>{error}</Text>}
                </View>
            ) : (
                /* If the route is ready, show the map with a "Back" button to return to the form */
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.backButton} onPress={() => setMapHtml(null)}>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>
                    <WebView 
                        style={styles.map} 
                        originWhitelist={['*']} 
                        source={{ html: mapHtml }} 
                    />
                </View>
            )}
        </View>
    );
}

// Styles for the routing interface
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF', // Matching the app theme blue
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10, // Ensure the button stays on top of the map
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
