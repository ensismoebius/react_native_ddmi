// npm install expo-location
// npm install expo-sensor
// npm install victory
// npm install react-native-maps

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

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
                    timeInterval: 1000,      // atualiza a cada 1s
                    distanceInterval: 1,     // ou a cada 1 metro
                },
                (loc) => setLocation(loc)
            );
        })();

        return () =>
        {
            if (subscription) subscription.remove(); // limpa ao desmontar
        };
    }, []);

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : location ? (
                <>
                    <Text>Latitude: {location.coords.latitude}</Text>
                    <Text>Longitude: {location.coords.longitude}</Text>
                </>
            ) : (
                <Text>Aguardando localização...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
