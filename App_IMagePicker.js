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
    ActivityIndicator,
    TouchableOpacity,
    Image
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//*Link:: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/fastSeek
import ImagePicker from 'react-native-image-crop-picker';

//* Not working links :: 

// This are the Links ::
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Body+Weight/Core+training/Workout+1/Core+-+beg+-+bw+-+smaller+size.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/beginner/Dumbbells+Bands/Total+body+strength/Workout+1/Full+-+db%2C+beg+-+rendered+small.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Body+Weight/Core+training/Workout+1/Core+-+Intermed+-+bw-render+smaller.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Dumbbells+Bands/Lower+body+training/Workout+2/lower+-+dbs%2C+bands+-+inter-fixed+title.m3u8
// https://phalanx-staging.s3.us-east-2.amazonaws.com/workoutvideo/intermediate/Ruck+Sandbag/Total+body+strength/Workout+2/Ruck+-+full+-+interm+-+short.m3u8


const App = () => {
    const [photos, setPhotos] = useState([]);

    const onPressSelect = async () => {
        // You can also use as a promise without 'callback':
        try {
            const result = await launchImageLibrary({
                mediaType: "photo",
                selectionLimit: 5
            });
            console.log("Result--->", result);
            setPhotos(result.assets)
        } catch (error) {
            console.log("error--->", error);

        }
    }
    console.log("photos--->", photos);

    const onPressCropPicker = async () => {
        try {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "photo",
            }).then(images => {
                console.log(images);
                setPhotos(images)
            });

        } catch (error) {

        }
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    style={styles.scrollView}>
                    <TouchableOpacity onPress={onPressSelect}>
                        <Text style={{ color: "black" }}>{"Select Image Picker Photos"}</Text>
                    </TouchableOpacity>
                    {
                        photos && photos.length ?
                            <View>
                                {
                                    photos.map((obj) => {
                                        return (
                                            <View>
                                                <Image style={{
                                                    height: 100, width: 100
                                                }}
                                                    source={{ uri: obj?.uri ? obj.uri : obj?.path }}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            : null
                    }
                    <TouchableOpacity onPress={onPressCropPicker}>
                        <Text style={{ color: "black" }}>{"Select Image Crop Picker Photos"}</Text>
                    </TouchableOpacity>
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