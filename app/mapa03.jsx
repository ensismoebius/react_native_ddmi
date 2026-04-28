import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, SafeAreaView, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapScreen()
{
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [mapCoords, setMapCoords] = useState(null);
    const [marker, setMarker] = useState(null);

    const handleGoToLocation = () =>
    {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        if (!isNaN(lat) && !isNaN(lon))
        {
            setMapCoords({ latitude: lat, longitude: lon });
            setMarker({ latitude: lat, longitude: lon }); // This line sets the marker
        }
    };

    // Generate OSM URL with marker if marker is set
    let osmUrl = 'https://www.openstreetmap.org';
    if (mapCoords)
    {
        if (marker)
        {
            // OSM marker: https://www.openstreetmap.org/?mlat=LAT&mlon=LON#map=15/LAT/LON
            // This line adds the marker to the OpenStreetMap URL
            osmUrl = `https://www.openstreetmap.org/?mlat=${marker.latitude}&mlon=${marker.longitude}#map=15/${mapCoords.latitude}/${mapCoords.longitude}`;
        } else
        {
            osmUrl = `https://www.openstreetmap.org/#map=15/${mapCoords.latitude}/${mapCoords.longitude}`;
        }
    }

    // Calculate bottom padding for Android navigation bar
    const androidNavBarHeight = Platform.OS === 'android' ? 48 : 0; // 48 is a common nav bar height
    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: androidNavBarHeight }]}> 
            <WebView source={{ uri: osmUrl }} style={styles.map} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    value={latitude}
                    onChangeText={setLatitude}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
                    keyboardType="numeric"
                />
                <Button title="Go" onPress={handleGoToLocation} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 8,
        paddingHorizontal: 8,
        backgroundColor: '#f9f9f9',
    },
    map: { flex: 1 },
});
