// import React, { useEffect, useState } from 'react';
// import { View, Platform, ScrollView, StyleSheet } from 'react-native';
// import GoogleFitAndroidScreen from './src/GoogleFitAndroidScreen';
// import AppleHealthKitIOSScreen from './src/AppleHealthKitIOSScreen';
// import RNFitness from './src/RNFitness';
// // import OTPTextInput from './src/OTPTextInput';
// const placeholderImage = require("./src/images/feedPostPlaceholder/feedPostPlaceholder.png")
// import {
//   OTPTextInput, CustomHeader, CustomButton,
//   CustomLoader, iPhoneHelp, scale, verticalScale, moderateScale,
//   HelperFunction, CacheImage
// } from "react-native-reusable-custom-components"
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-player';
// const App = () => {
//   // let video = "https://workoutvideo.s3.us-east-2.amazonaws.com/sample_960x540.m3u8";
//   // let video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+1/Core+-+beg+-+bw+-+smaller+size.m3u8"
//   // let video = "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8";

//   // const video = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
//   // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+1/Core+-+beg+-+bw+-+smaller+size.m3u8";// error
//   // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+2/CORE+-+beg+-+bw.m3u8";
//   const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/High+intensity+interval+training/Workout+1/HIIT+-+bw%2C+cones+-+beg.m3u8";
//   // const video = 'https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/High+intensity+interval+training/Workout+2/HIIT+-+bw+-+begin.m3u8';
//   // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Dumbbells+Bands/Total+body+strength/Workout+1/Full+-+db%2C+beg+-+rendered+small.m3u8"; // error
//   // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Dumbbells+Bands/High+intensity+interval+training/Workout+2/HIIT+-+dbs%2C+bands+-+inter.m3u8";
//   // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Lower+body+training/Workout+3/Lower+-+bw+-+beg.m3u8";
//   console.log("video :: ", video);

//   return (
//     <View style={{ flex: 1, height: "100%", width: "100%" }}>
//       {/* {
//         Platform.OS == "android" ?
//           <GoogleFitAndroidScreen />
//           :
//           <AppleHealthKitIOSScreen />
//       } */}
//       {/* <RNFitness /> */}
//       {/* <Video
//         paused={false}
//         source={{
//           uri: video, type: "m3u8",
//           headers: {
//             "Content-Type": "application/x-mpegURL"
//           }
//         }}
//         // poster={thumb}
//         style={styles.backgroundVideo}
//         onEnd={() => {

//         }}
//         onLoad={(data) => {
//           console.log("data onLoad::", data)
//         }}
//         onLoadStart={() => {
//           console.log("data onLoadStart::")
//         }}
//         onProgress={(data) => {
//           console.log("data onProgress::", data)
//         }}
//         onBuffer={(data) => {
//           console.log("data onBuffer::", data)
//         }}
//         resizeMode="contain"
//         rate={1.0}
//         volume={10}
//         ignoreSilentSwitch={'ignore'}
//         posterResizeMode={'contain'}
//         pictureInPicture={true}
//         repeat={false}
//         onError={(err) => {
//           console.log('Video err 123=>', err);
//           alert(JSON.stringify(err))
//           // const video = changeUrlExtension(videoURL, 'mp4');
//           // setNewVideoURL(video);
//         }}
//         // ref={(ref) => (videoPlayer.current = ref)}
//         hls={true}
//       /> */}
//       <VideoPlayer
//         video={{ uri: video, type: "m3u8", isNetwork: true }}
//         videoWidth={1600}
//         videoHeight={900}
//         thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}

//         onLoad={(data) => {
//           console.log("data onLoad::", data)
//         }}
//         onLoadStart={() => {
//           console.log("data onLoadStart::")
//         }}
//         onProgress={(data) => {
//           console.log("data onProgress::", data)
//         }}
//         onBuffer={(data) => {
//           console.log("data onBuffer::", data)
//         }}
//         onError={(err) => {
//           console.log('Video err 123=>', err);
//           // alert(JSON.stringify(err))
//           // const video = changeUrlExtension(videoURL, 'mp4');
//           // setNewVideoURL(video);
//         }}
//       />
//     </View>
//   )
// }

// export default App;

// // Later on in your styles..
// var styles = StyleSheet.create({
//   backgroundVideo: {
//     backgroundColor: "red",
//     flex: 1
//   },
// });



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Animated,
    ActivityIndicator
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import WebView from 'react-native-webview';

const calcVLCPlayerHeight = (windowWidth, aspetRatio) => {
    return windowWidth * aspetRatio;
};

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [seekValue, setSeek] = useState(0);
    const [netInformation, setNetInfo] = useState('');
    const [VideoEnded, setVideoEnded] = useState(false);
    // const [newVideoURL, setNewVideoURL] = useState(videoURL);

    const animated = useRef(new Animated.Value(0)).current;
    const hideTimeout = useRef(null);

    const [showVideo, setVideo] = useState(false)

    const onPaused = (playerState) => {
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer?.current.seek(0);
    };

    const onSeek = (seek) => {
        console.log("seek ::", seek);
        let seekValue = ((seek * 100) / (duration * 1000))
        console.log("seekValue::", seekValue);
        let temp1 = seekValue.toFixed(2);
        let temp2 = temp1 * 10 > 1 ? temp1 : temp1 * 10;

        console.log("videoPlayer ::", videoPlayer);
        console.log("temp2 ::", temp2);
        // videoPlayer?.current.seek(seekValue);
        setSeek(temp2)
    };

    const onError = (data) => {
        setPaused(!paused);
        setPlayerState(0);
    };

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };
    const onSeeking = (currentTime) => {
        console.log("currentTime ::", currentTime);
        setCurrentTime(currentTime);
    };
    const onBuffer = (data) => {
        if (data?.isBuffering) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    };

    const noop = () => {
        setIsFullScreen(true);
    };

    const onLoad = (data) => {
        console.log('onLoad data =>', data);
        setDuration(data.duration / 1000);
        setIsLoading(false);
        if (!isLoading) {
            setCurrentTime(data?.currentTime / 1000);
        }
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        // setPlayerState(PLAYER_STATES.ENDED);
    };
    // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/High+intensity+interval+training/Workout+1/HIIT+-+bw%2C+cones+-+beg.m3u8"; // * working
    // let video = "https://workoutvideo.s3.us-east-2.amazonaws.com/sample_960x540.m3u8";
    //   // let video = "https://workoutvideo.s3.us-east-2.amazonaws.com/sample_960x540.m3u8";
    // let video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+1/Core+-+beg+-+bw+-+smaller+size.m3u8" //*error

    // let video = "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8";
    // const video = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
    // let video = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8";

    const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+2/CORE+-+beg+-+bw.m3u8"; //* working
    // const video = 'https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/High+intensity+interval+training/Workout+2/HIIT+-+bw+-+begin.m3u8';//* working
    // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Dumbbells+Bands/Total+body+strength/Workout+1/Full+-+db%2C+beg+-+rendered+small.m3u8"; //* error
    // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Dumbbells+Bands/High+intensity+interval+training/Workout+2/HIIT+-+dbs%2C+bands+-+inter.m3u8"; //*working
    // const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Lower+body+training/Workout+3/Lower+-+bw+-+beg.m3u8";
    // const video = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8";
    const videoPlayer = useRef(null);
    console.log("Video player::", videoPlayer);
    // console.log("VLCPlayer player::", VLCPlayer.seek(1));
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    style={styles.scrollView}>
                    {/* <Header title="test"/> */}
                    {/* <View style={styles.body}>
            <VLCPlayer
              source={{
                initType: 2,
                hwDecoderEnabled: 1,
                hwDecoderForced: 1,
                uri: video,
                initOptions: [
                  // '--no-audio',
                  // '--rtsp-tcp',
                  // '--network-caching=150',
                  // '--rtsp-caching=150',
                  // '--no-stats',
                  // '--tcp-caching=150',
                  // '--realrtsp-caching=150',
                ],
              }}
              paused={paused}
              autoplay={true}
              autoAspectRatio={true}
              resizeMode="cover"
              // videoAspectRatio={"4:3"}
              isLive={false}
              autoReloadLive={false}
              style={{ height: calcVLCPlayerHeight(Dimensions.get('window').width, 3 / 4), marginTop: 30 }}
              onError={(error) => {
                console.log("Error :: ", error)
              }}
              onLoadStart={(data) => {
                console.log("onLoadStart data:: ", data)
              }}
              onOpen={(data) => {
                console.log("onOpen data:: ", data)
              }}
              seek={seekValue}
              onProgress={(data) => {
                console.log("onProgress data:: ", data)
                onLoad(data)
                // setSeek(data?.position)
              }}
              repeat={false}
              onBuffering={(data) => {
                console.log("onBuffering data:: ", data)
              }}
              onPlaying={(data) => {
                console.log("onPlaying data:: ", data)
              }}
              onEnded={(data) => {
                console.log("onEnd data:: ", data)
              }}
              onEnd={(data) => {
                console.log("onEnd data:: ", data)
              }}
              onVideoEnded={(data) => {
                console.log("onVideoEnded data:: ", data)
              }}
              ref={(ref) => (videoPlayer.current = ref)}
            />
            <MediaControls
              //             // isFullScreen={isFullScreen}
              // onFullScreen={makeFullScreen}
              duration={duration}
              isLoading={isLoading}
              mainColor="transparent"
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              containerStyle={{
                // marginBottom: fullVideo ? 25 : 0,
              }}
              progress={currentTime}></MediaControls>
          </View>
          {isLoading ?
            <ActivityIndicator color={"black"} size={'small'} />
            : null
          } */}
                    {/* <Video
            paused={false}
            source={{
              uri: video,
              type: "m3u8"
            }}
            // poster={thumb}
            style={[styles.backgroundVideo, { height: 500, width: "100%" }]}
            onEnd={() => {

            }}
            onLoad={(data) => {
              console.log("data onLoad::", data)
            }}
            onLoadStart={() => {
              console.log("data onLoadStart::")
            }}
            onProgress={(data) => {
              console.log("data onProgress::", data)
            }}
            onBuffer={(data) => {
              console.log("data onBuffer::", data)
            }}
            resizeMode="contain"
            rate={1.0}
            volume={10}
            ignoreSilentSwitch={'ignore'}
            posterResizeMode={'contain'}
            pictureInPicture={true}
            repeat={false}
            onError={(err) => {
              console.log('Video err 123=>', err);
              alert(JSON.stringify(err))
              // const video = changeUrlExtension(videoURL, 'mp4');
              // setNewVideoURL(video);
            }}
            onVideoError={() => {

            }}


            automaticallyWaitsToMinimizeStalling={true}
            allowsExternalPlayback
          // ref={(ref) => (videoPlayer.current = ref)}
          // hls={true}
          /> */}
                    <WebView
                        // source={{ uri: video }}
                        style={{ flex: 1 }}
                        allowsFullscreenVideo
                        // injectedJavaScript={`document.addEventListener = function (event) {window.ReactNativeWebView.postMessage(JSON.stringify(event)) }`}
                        injectedJavaScript={`
              (function() {
                setTimeout(() => {
                  var video = document.getElementsByTagName("video")[0];
                  console.log("Video",JSON.stringify(video))
                    video.addEventListener('webkitbeginfullscreen', (event) => {
                      window.ReactNativeWebView.postMessage("Full Screen");
                    })
                    video.addEventListener('webkitendfullscreen', (event) => {
                      window.ReactNativeWebView.postMessage("End Full Screen");
                    })
                   video.addEventListener('ended', (event) => {
                     window.ReactNativeWebView.postMessage("End video");
                   })
                   video.addEventListener('webkitendvideo', (event) => {
                     window.ReactNativeWebView.postMessage("video ended");
                   })
                   video.addEventListener('waiting', (event) => {
                    window.ReactNativeWebView.postMessage('Video is waiting for more data.');
                  });
                  video.addEventListener('playing', (event) => {
                    window.ReactNativeWebView.postMessage('Video is no longer paused');
                  });
                }, 1000)
              })();
              true
            `}
                        // injectedJavaScript={`document.getElementsByTagName("video")[0].play();`}
                        // injectedJavaScript="window.ReactNativeWebView.postMessage(JSON.stringify(document));"
                        source={{ uri: video }}
                        mediaPlaybackRequiresUserAction={true}
                        onMessage={m => console.log("Full screen video ::", (m.nativeEvent.data))}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: Colors.black,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    backgroundVideo: {
        backgroundColor: "red",
    },
});

export default App;