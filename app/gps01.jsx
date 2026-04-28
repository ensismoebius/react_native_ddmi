import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useTranslation } from '../hooks/useTranslation';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg(t ? t('gps.permissionDenied') : 'Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, [t]);

    const waitingText = t ? t('gps.waiting') : 'Waiting...';
    const errorText = errorMsg || '';
    
    let text = waitingText;
    if (errorMsg) text = errorText;
    else if (location) {
        const lat = t ? t('map.latitude') : 'Latitude';
        const lon = t ? t('map.longitude') : 'Longitude';
        text = `${lat}: ${location.coords.latitude}\n${lon}: ${location.coords.longitude}`;
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