import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function App()
{
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() =>
    {
        let subscription;

        (async () =>
        {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted')
            {
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

        return () =>
        {
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
                <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker 
                        coordinate={{ 
                            latitude: location.coords.latitude, 
                            longitude: location.coords.longitude 
                        }} 
                        title="Você está aqui" 
                    />
                </MapView>
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
