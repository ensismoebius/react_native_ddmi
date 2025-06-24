import { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

export default function Mapa02() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        let listener;
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permissão negada');
                return;
            }

            listener = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,      // atualiza a cada 1s
                    distanceInterval: 1,     // ou a cada 1 metro
                },
                (loc) => setLocation(loc)
            );
        })
        return () => {
            if (listener) listener.remove(); // limpa ao desmontar
        };
    }, []);

    return (
        <View>
            {
                errorMsg ?
                    (<Text>{errorMsg}</Text>) :
                    (
                    <>
                        <Text>Latitude: {location.coords.latitude}</Text>
                        <Text>Longitude: {location.coords.longitude}</Text>
                    </>
                    );
            }

        </View>
    );
}