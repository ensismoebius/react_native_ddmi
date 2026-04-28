// Import React and hooks for state and lifecycle management
import React, { useEffect, useState } from 'react';
// Import essential UI components from React Native
import { StyleSheet, View, Text, Dimensions } from 'react-native';
// Import the expo-location library to access the device's GPS
import * as Location from 'expo-location';
// Import WebView to render an HTML-based map (OpenStreetMap)
import { WebView } from 'react-native-webview';
// Import the map template utility to keep the component clean
import { getLocationMapHtml } from '../utils/mapTemplates';

// The main component for the Current Location screen
export default function App() {
    // State to store the current coordinates of the device
    const [location, setLocation] = useState(null);
    // State to store any error messages (e.g., if permissions are denied)
    const [errorMsg, setErrorMsg] = useState(null);

    // UseEffect runs once when the screen loads to setup location tracking
    useEffect(() => {
        let subscription;
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão negada');
                return;
            }
            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (loc) => setLocation(loc)
            );
        })();
        return () => {
            if (subscription) subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <View style={styles.centered}>
                    <Text>{errorMsg}</Text>
                </View>
            ) : location ? (
                <WebView 
                    style={styles.map}
                    originWhitelist={['*']}
                    source={{ 
                        html: getLocationMapHtml(location.coords.latitude, location.coords.longitude) 
                    }}
                />
            ) : (
                <View style={styles.centered}>
                    <Text>Aguardando localização...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

