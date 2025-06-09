import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

export default function MapScreen()
{
    const [location, setLocation] = useState(null);

    useEffect(() =>
    {
        (async () =>
        {
            let { status } = await Location.
                requestForegroundPermissionsAsync();
            
            if (status !== 'granted') return;
            
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    const osmUrl = location
        ? `https://www.openstreetmap.org/#map=15/${location.latitude}/${location.longitude}`
        : 'https://www.openstreetmap.org';

    return (
        <View style={styles.container}>
            <WebView source={{ uri: osmUrl }} style={styles.map} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});
