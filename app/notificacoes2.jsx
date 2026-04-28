// npm install expo-notifications expo-device

import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

async function notificationHandler() {
    return (
        {
            shouldShowBanner: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }
    );
}

// Notification handler
Notifications.setNotificationHandler(
    {
        handleNotification: notificationHandler,
    }
);

export default function App() {
    const [notification, setNotification] = useState(false);


    useEffect(() => {

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

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
                        trigger: { seconds: 0 },
                    });
                }}
            />
        </View>
    );
}
