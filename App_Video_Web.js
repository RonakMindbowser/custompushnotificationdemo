/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
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

//*Link:: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/fastSeek


//* Not working links :: 

// This are the Links ::
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+1/Core+-+beg+-+bw+-+smaller+size.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Dumbbells+Bands/Total+body+strength/Workout+1/Full+-+db%2C+beg+-+rendered+small.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Body+Weight/Core+training/Workout+1/Core+-+Intermed+-+bw-render+smaller.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Dumbbells+Bands/Lower+body+training/Workout+2/lower+-+dbs%2C+bands+-+inter-fixed+title.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Ruck+Sandbag/Total+body+strength/Workout+2/Ruck+-+full+-+interm+-+short.m3u8


const App = () => {
    const video = "https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Dumbbells+Bands/Total+body+strength/Workout+1/Full+-+db%2C+beg+-+rendered+small.m3u8"; //* working
    console.log("video::", video);
    const videoPlayer = useRef(null);

    /**
   *  This script dispatches new custom messaging event
   */
    function getInjectableJSMessage(message) {
        return `
     (function() {
       document.dispatchEvent(new MessageEvent('message', {
         data: ${JSON.stringify(message)}
       }));
     })();
   `;
    }

    useEffect(() => {
        setTimeout(() => {
            console.log("videoPlayer :: ", videoPlayer);
            // videoPlayer.current.postMessage("Video Event from app to webview")
            videoPlayer.current.injectJavaScript(
                getInjectableJSMessage({
                    message: 'Triggered event',
                    triggeredAt: new Date(),
                })
            );
        }, 15000);
    }, [])


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    style={styles.scrollView}>
                    <WebView
                        style={{ flex: 1 }}
                        allowsFullscreenVideo
                        // injectedJavaScript={`
                        //   (function() {
                        //     setTimeout(() => {
                        //       var video = document.getElementsByTagName("video")[0];
                        //       console.log("Video",JSON.stringify(video))
                        //         video.addEventListener('webkitbeginfullscreen', (event) => {
                        //           window.ReactNativeWebView.postMessage("Full Screen");
                        //         })
                        //         video.addEventListener('webkitendfullscreen', (event) => {
                        //           window.ReactNativeWebView.postMessage("End Full Screen");
                        //         })
                        //        video.addEventListener('ended', (event) => {
                        //          window.ReactNativeWebView.postMessage("End video");
                        //        })
                        //        video.addEventListener('webkitendvideo', (event) => {
                        //          window.ReactNativeWebView.postMessage("video ended");
                        //        })
                        //        video.addEventListener('waiting', (event) => {
                        //         window.ReactNativeWebView.postMessage('Video is waiting for more data.');
                        //       });
                        //       video.addEventListener('playing', (event) => {
                        //         window.ReactNativeWebView.postMessage('Video is no longer paused');
                        //       });
                        //     }, 1000)
                        //   })();
                        //   true
                        // `}
                        injectedJavaScript={`
               (function() {
                 setTimeout(() => {
                   var video = document.getElementsByTagName("video")[0];
                   console.log("Video",JSON.stringify(video))
                     video.addEventListener('webkitbeginfullscreen', (event) => {
                       window.ReactNativeWebView.postMessage('BEGIN_FULL_SCREEN');
                     })
                     video.addEventListener('webkitendfullscreen', (event) => {
                       window.ReactNativeWebView.postMessage('END_FULL_SCREEN');
                     })
                    video.addEventListener('ended', (event) => {
                      window.ReactNativeWebView.postMessage('VIDEO_ENDED');
                    })
                    video.addEventListener('waiting', (event) => {
                     window.ReactNativeWebView.postMessage('VIDEO_BUFFERING');
                   });
                   video.addEventListener('playing', (event) => {
                     window.ReactNativeWebView.postMessage('VIDEO_PLAYING');
                   });
                   video.addEventListener('error', (event) => {
                     console.log('video error');
                     window.ReactNativeWebView.postMessage('video error');
                   });
                   video.addEventListener('pause', (event) => {
                     console.log('video pause');
                     window.ReactNativeWebView.postMessage('video pause');
                   });
                   video.addEventListener('canplay', (event) => {
                     window.ReactNativeWebView.postMessage('Video can start, but not sure it will play through.');
                   });
                   video.addEventListener('loadedmetadata', (event) => {
                     window.ReactNativeWebView.postMessage('loadedmetadata');
                   });
                   video.addEventListener('loadeddata', (event) => {
                     window.ReactNativeWebView.postMessage('loadeddata');
                   });
                   video.addEventListener('durationchange', (event) => {
                     window.ReactNativeWebView.postMessage('Not sure why, but the duration of the video has changed.');
                    });
                    document.addEventListener("message", (message)=>{
                       // video.pause()
                       // video.fastSeek(20);
                    });
                 }, 1000)
                 
               })();
               true
             `}
                        source={{ uri: video }}
                        mediaPlaybackRequiresUserAction={true}
                        onMessage={m => console.log("Full screen video ::", (m.nativeEvent.data))}
                        ref={(ref) => (videoPlayer.current = ref)}
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