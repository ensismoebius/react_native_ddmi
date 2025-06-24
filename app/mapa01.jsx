// npm install expo-location --legacy-peer-deps

import { useEffect } from "react";

export default function Mapa01() {

    // Conterá as coordenadas gps
    const [location, setLocation] = useState(null);

    // Conterá os erros
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission denied');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
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