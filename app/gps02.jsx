import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { getLocationMapHtml } from '../utils/mapTemplates';
import { useTranslation } from '../hooks/useTranslation';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        let subscription;
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg(t ? t('gps.permissionDenied') : 'Permissão negada');
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
    }, [t]);

    const waitingText = t ? t('gps.waiting') : 'Aguardando localização...';

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
                    <Text>{waitingText}</Text>
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