import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'https://pchelka.org/api/sendNotification';
import { getExpoToken, setExpoToken, removeExpoToken } from '../api/token';

const registerForPushNotifications = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    await setExpoToken(token);
    // let token = await getToken();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: token,
            }
        }),
    });
}
export default registerForPushNotifications;