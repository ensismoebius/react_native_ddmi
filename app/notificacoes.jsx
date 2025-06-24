// npm install expo-notifications expo-device


import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// Notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) setExpoPushToken(token);
        });

        // Listener for foreground notifications
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // Listener for response (click)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.remove(notificationListener.current);
            Notifications.remove(responseListener.current);
        };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text>Expo Push Token: {expoPushToken}</Text>
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
                        trigger: { seconds: 5 },
                    });
                }}
            />
        </View>
    );
}

async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
        alert('Must use physical device for Push Notifications');
        return;
    }

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

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}
