import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';


// Define como o app deve lidar com a notificação quando ela for recebida
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {

    // Cria um estado chamado notification, usado para armazenar a última notificação recebida e mostrar na tela.
    const [notification, setNotification] = useState(false);

    useEffect(() => {

        // Cria um função para registrar
        async function registerForPushNotificationsAsync() {
            
            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
        }

        registerForPushNotificationsAsync();


        // Adiciona um listener para quando uma notificação for recebida com o app em primeiro plano. Ela é armazenada no estado local.
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // Adiciona um listener para quando o usuário interage com a notificação (ex: clica nela). Só imprime no console por enquanto.
        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        
        // Remove os listeners quando o componente for desmontado (evita vazamento de memória).
        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification?.request?.content?.title ?? 'None'}</Text>
                <Text>Body: {notification?.request?.content?.body ?? 'None'}</Text>
            </View>
            <Button
                title="Schedule Notification"
                onPress={async () => {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Hello from Expo!',
                            body: 'This is a scheduled notification.',
                        },
                        trigger: { seconds: 2 }, // Evita problemas com 0
                    });
                }}
            />
        </View>
    );
}
