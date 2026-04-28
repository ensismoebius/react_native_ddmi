// npm install expo-location
// npm install expo-sensor
// npm install victory
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App()
{
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() =>
    {
        (async () =>
        {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted')
            {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    let text = 'Waiting...';
    if (errorMsg) text = errorMsg;
    else if (location)
    {
        text = `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`;
    }

    return (
        <View style={styles.container}>
            <Text>{text}</Text>
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
