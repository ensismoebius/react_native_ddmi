import { Button } from "react-native";
import { View } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

async function notificationHandler() {
    return (
        {
            shouldShowAlert: true,
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

export default function Notificacoes() {

    const [notification, setNotification] = useState(false);

    useEffect(() => {

        const notificationListener =
            Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

        return () => {
            notificationListener.remove();
        };
    }, []);

    async function enviarNotificacao() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Olá notificação!',
                body: 'Esta é uma notificação agendada.',
            },
            trigger: { seconds: 3 },
        });
    }

    return (
        <View>
            <Button
                title="Notificar"
                onPress={enviarNotificacao}
            />
        </View>
    );
}