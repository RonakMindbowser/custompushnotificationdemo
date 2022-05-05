import React, { useEffect, useState } from 'react';
import { Text, View, Platform } from 'react-native';
import PushNotification from './src/PushNotification';
import notifee, { EventType } from '@notifee/react-native';
import { RNFFprobe } from 'react-native-ffmpeg';
// const { getVideoDurationInSeconds } = require('get-video-duration')
// import MediaMeta from 'react-native-media-meta';
// import { ProcessingManager } from 'react-native-video-processing';
import LottieView from 'lottie-react-native';
import GoogleFitAndroidScreen from './src/GoogleFitAndroidScreen';
import AppleHealthKitIOSScreen from './src/AppleHealthKitIOSScreen';

function secondsToTime(e) {
    var h = Math.floor(e / 3600).toString().padStart(2, '0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
        s = Math.floor(e % 60).toString().padStart(2, '0');

    return h + ':' + m + ':' + s;
    //return `${h}:${m}:${s}`;
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'dance') {
        // Update external API
        // Remove the notification
        await notifee.cancelNotification(notification.id);
    }
});

const googleFitClientId = "290146831688-pidp57t71u84rgpk6ma8j3obmnns6a9a.apps.googleusercontent.com"

const App = () => {
    const [duration, setDuration] = useState("")
    const [formattedTime, setFormatTime] = useState("")
    let source = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Dumbbells+Bands/Upper+body+training/Workout+5/Upper+-+dbs,+bands+-+inter.mp4";

    // let localPath = "file:///data/user/0/com.flerish.app.dev/cache/react-native-image-crop-picker/Rudra - The Edge Of Darkness S01E01 Hindi 720p [Vegamovies.NL].mkv";
    let localPath = "file:///storage/emulated/0/Download/whatsapp_video_2022-02-03_at_11.53.25_am_01.mp4";
    let tempPath = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';

    let source1 = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+1/Core+-+beg+-+bw+(smaller+size).mp4";
    let souece2 = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+2/CORE+-+beg+-+bw.mp4";
    let source3 = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+3/Core+-+bw+-+beg.mp4";

    useEffect(() => {
        //* For Get Duration of video without download
        // RNFFprobe.getMediaInformation(source).then(information => {
        //   console.log('Result: ', information);
        //   if (information.getMediaProperties() !== undefined) {
        //     if (information.getMediaProperties().duration !== undefined) {
        //       console.log(`Duration 123: ${information.getMediaProperties().duration}`);
        //       setDuration(information.getMediaProperties().duration)
        //       setFormatTime(secondsToTime(information.getMediaProperties().duration))
        //     }
        //   }
        // });
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
            {/* <Text style={{ color: "black", fontSize: 14 }}>{duration ? "Duration :" + duration : "wait"}</Text> */}
            {/* <Text style={{ color: "black", fontSize: 14 }}>{formattedTime ? "formattedTime :" + formattedTime : "wait"}</Text> */}

            {/* <LottieView source={require("./src/HamburgerArrow.json")} autoPlay loop /> */}
            {/* <LottieView source={require("./src/animatedPin.json")} autoPlay loop /> */}
            {
                Platform.OS == "android" ?
                    <GoogleFitAndroidScreen />
                    :
                    <AppleHealthKitIOSScreen />
            }
        </View>
    )
}

export default App;
