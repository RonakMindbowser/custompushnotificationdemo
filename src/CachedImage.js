import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
var RNFS = require('react-native-fs');
const placeholderImage = require("./images/feedPostPlaceholder/feedPostPlaceholder.png")
const CachedImage = ({
    source = { uri: "" },
    resizeMode,
    defaultImage,
    defaultImageResizeMode,
    defaultImageStyle = {},
    imageStyle = {},
    errorImage,
    errorImageStyle = {},
    style = {},
    containerStyle,
    onLoadStart,
    onLoad,
    onError
}) => {
    const [failToLoad, setFailedToLoad] = useState(false)
    const [localSource, setLocalSource] = useState(null)
    const [loadSuccess, setLoadSuccess] = useState(false)

    console.log("Source --->", source);

    useEffect(() => {
        checkForImageLocalPathNew()
    }, [])

    const checkForImageLocalPathNew = async () => {
        if (source?.uri) {
            setLoadSuccess(false)
            var filename = source.uri.replace(/^.*[\\\/]/, '')
            console.log("filename --->", filename);
            let dirPath = 'file://' + RNFS.CachesDirectoryPath + '/images/'

            RNFS.exists(dirPath).then((res) => {
                console.log("res ---exists>", res);
                if (res) { performImageStoreAction() }
                else {
                    RNFS.mkdir(dirPath)
                        .then((value) => { performImageStoreAction() })
                        .catch((err) => { loadFailureOfImage() })
                }
            }).catch((err) => { loadFailureOfImage() })
        }
        else { loadFailureOfImage() }
    }

    const loadFailureOfImage = () => {
        setFailedToLoad(true)
        setLoadSuccess(false)
    }

    const loadSuccessOfImage = (imageCachePath) => {
        setLocalSource({ uri: imageCachePath })
        setFailedToLoad(false)
        setLoadSuccess(true)
    }

    const performImageStoreAction = () => {
        var filename = source.uri.replace(/^.*[\\\/]/, '')
        let imageCachePath = 'file://' + RNFS.CachesDirectoryPath + '/images/' + filename;

        RNFS.exists(imageCachePath).then((isImageExist) => {
            console.log("isImageExist ---482>", isImageExist);
            if (isImageExist) {
                loadSuccessOfImage(imageCachePath)
            }
            else {
                RNFS.downloadFile({
                    fromUrl: source.uri,
                    toFile: imageCachePath
                }).promise.then((response) => {
                    console.log("Response==985==>", response);
                    loadSuccessOfImage(imageCachePath)
                }).catch((error) => { loadFailureOfImage() })
            }
        }).catch((error) => { loadFailureOfImage() })
    }

    console.log("localSource---->", localSource);
    const renderImageView = () => {
        if (failToLoad) {
            return (
                <Image
                    source={errorImage || placeholderImage}
                    resizeMode={resizeMode || "cover"}
                    style={style ? style : [styles.errorImageStyle, errorImageStyle]}
                />
            )
        }
        else if (loadSuccess) {
            return (
                <ImageBackground
                    source={placeholderImage}
                    style={style ? style : [styles.defaultImageStyle, defaultImageStyle]}
                >
                    <Image
                        source={localSource}
                        resizeMode={resizeMode || "cover"}
                        onError={(e) => { loadFailureOfImage() }}
                        style={style ? style : [styles.imageStyle, imageStyle]}
                    />
                </ImageBackground>
            )
        }
        else {
            return (
                <Image
                    source={placeholderImage}
                    resizeMode={resizeMode || "cover"}
                    style={style ? style : [styles.defaultImageStyle, defaultImageStyle]}
                />
            )
        }
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {renderImageView()}
        </View>
    );
}

export default CachedImage;

let styles = StyleSheet.create({
    container: {
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    defaultImageStyle: {
        height: 150,
        width: 150
    },
    errorImageStyle: {
        height: 150,
        width: 150
    }
});
