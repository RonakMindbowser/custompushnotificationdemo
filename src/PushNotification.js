import React, { useEffect, useRef, useState } from 'react';
import { AppState, Text, View, Platform, Image, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility, RepeatFrequency, TriggerType } from '@notifee/react-native';
import { AndroidColor, TimestampTrigger } from '@notifee/react-native';

const PushNotification = () => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [channelId, setChannelId] = useState(null)

    useEffect(() => {
        checkPermission();
    }, [])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                console.log("App has come to the foreground!");
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });

        // forground ( when app open ) in firebase notification
        messaging().onMessage(async remoteMessage => {
            console.log("remote message when app is in foreground::", remoteMessage);
            console.log("channelId when app is in foreground::", channelId);
            if (appState.current == "active") {
                createChannel()
            }
        });

        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("remoteMessage onNotificationOpenedApp-->", remoteMessage);
        });

        // executes when application is in background state.
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log("remoteMessage setBackgroundMessageHandler-->", remoteMessage);
        });

        //If your app is closed
        messaging().getInitialNotification().then((notificationOpen) => {
            console.log("remoteMessage getInitialNotification-->", notificationOpen);

        });
        checkForIOS();

        return () => {
            subscription.remove()
        }
    }, [])

    const createChannel = async () => {
        const channelId = await notifee.createChannel({
            id: 'CustmomPushDemo',
            name: 'CustmomPushDemo',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
            // sound: "default",
            soundURI: "https://www.kozco.com/tech/piano2-CoolEdit.mp3",
        });

        // Create a time-based trigger

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                color: AndroidColor.RED
            },
        });
        notifee.displayNotification({
            title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
            subtitle: '&#129395;',
            body:
                'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
            android: {
                channelId,
                smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                color: AndroidColor.RED,
                actions: [
                    {
                        title: '<b>Dance</b> &#128111;',
                        pressAction: { id: 'dance' },
                    },
                    {
                        title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
                        pressAction: { id: 'cry' },
                    },
                ],
            },
        });
        // Create a trigger notification

    }

    const checkPermission = async () => {
        const hasPermission = await messaging().hasPermission();
        const enabled = hasPermission === messaging.AuthorizationStatus.AUTHORIZED || hasPermission === messaging.AuthorizationStatus.PROVISIONAL;
        if (hasPermission === messaging.AuthorizationStatus.AUTHORIZED || hasPermission === messaging.AuthorizationStatus.PROVISIONAL) {
            await getFCMToken();
        }
        else if (hasPermission === messaging.AuthorizationStatus.DENIED || hasPermission === messaging.AuthorizationStatus.NOT_DETERMINED) {
            const isPermission = await requestUserPermission();
            if (!isPermission) {
                return false;
            }
            else getFCMToken();
        }
        else {
            const isPermission = await requestUserPermission();
            if (!isPermission) {
                return false;
            }
            else getFCMToken();
        }
    }

    /**request notification permission */
    const requestUserPermission = async () => {
        const settings = await messaging().requestPermission({
            provisional: false,
        });
        if (settings) {
            return settings;
        }
    }

    /**gets the fcm token */
    const getFCMToken = async () => {
        console.log("Checking for token");

        const token = await messaging().getToken();
        console.log("token--->", token);

    }

    /**check config for iOS platform */
    const checkForIOS = async () => {
        if (Platform.OS == "ios") {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    return null;
}

export default PushNotification;
