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
    base64Source,
    style = {},
    isBase64,
    containerStyle,
    onLoadStart,
    onLoad,
    onError
}) => {
    const [failToLoad, setFailedToLoad] = useState(false)
    const [loadComplete, setLoadToComplete] = useState(false)
    const [localSource, setLocalSource] = useState(null)
    const [loadSuccess, setLoadSuccess] = useState(false)

    console.log("Source --->", source);

    useEffect(() => {
        // checkForImageLocalPath()
        checkForImageLocalPathNew()
    }, [])

    const checkForImageLocalPath = async () => {
        if (source?.uri) {
            setLoadSuccess(false)
            var filename = source.uri.replace(/^.*[\\\/]/, '')
            console.log("filename --->", filename);
            const { config, fs } = RNFetchBlob;
            let fileCachePath = 'file://' + fs.dirs.CacheDir + '/images/' + filename;
            console.log("fileCachePath --->", fileCachePath);
            // RNFetchBlob.fs.exists(fileCachePath).then((isImageExist) => {
            //     console.log("isImageExist ---123>", isImageExist);
            //     if (isImageExist) {
            //         setLocalSource({ uri: fileCachePath })
            //         setLoadSuccess(true)
            //         setFailedToLoad(false)
            //     }
            //     else {
            //         RNFetchBlob.config({
            //             // fileCache: true,
            //             path: fileCachePath,
            //             addAndroidDownloads: {
            //                 useDownloadManager: false,
            //                 notification: false,
            //             }
            //         }).fetch("GET", source.uri).then((response) => {
            //             console.log("Response====>", response);
            //             if (response?.data) {
            //                 setLocalSource({ uri: response.data })
            //                 setFailedToLoad(false)
            //                 setLoadSuccess(true)
            //             }
            //             else {
            //                 setFailedToLoad(true)
            //                 setLoadSuccess(false)
            //             }
            //         }).catch((error) => {
            //             console.log('Error---123>', error);
            //             setFailedToLoad(true)
            //             setLoadSuccess(false)
            //         })
            //     }
            // }).catch((error) => {
            //     console.log("Error---->", error);
            //     setFailedToLoad(true)
            //     setLoadSuccess(false)
            // })
        }
        else {
            setFailedToLoad(true)
            setLoadSuccess(false)
        }
    }

    const checkForImageLocalPathNew = async () => {
        if (source?.uri) {
            setLoadSuccess(false)
            var filename = source.uri.replace(/^.*[\\\/]/, '')
            console.log("filename --->", filename);
            let dirPath = 'file://' + RNFS.CachesDirectoryPath + '/images/'
            let fileCachePath = dirPath + filename;
            console.log("fileCachePath --->", fileCachePath);

            RNFS.exists(dirPath).then((res) => {
                console.log("res ---exists>", res);

                if (res) {
                    checkFileAvaibility()
                }
                else {
                    RNFS.mkdir(dirPath).then((value) => {
                        checkFileAvaibility()
                    }).catch((err) => {
                        console.log("Error--456->", err);
                        setFailedToLoad(true)
                        setLoadSuccess(false)
                    })
                }

            }).catch((err) => {
                console.log("Error--789->", err);
                setFailedToLoad(true)
                setLoadSuccess(false)
            })
        }
        else {
            setFailedToLoad(true)
            setLoadSuccess(false)
        }
    }

    const checkFileAvaibility = () => {
        var filename = source.uri.replace(/^.*[\\\/]/, '')
        let fileCachePath = 'file://' + RNFS.CachesDirectoryPath + '/images/' + filename;

        RNFS.exists(fileCachePath).then((isImageExist) => {
            console.log("isImageExist ---482>", isImageExist);
            if (isImageExist) {
                setLocalSource({ uri: fileCachePath })
                setLoadSuccess(true)
                setFailedToLoad(false)
            }
            else {
                RNFS.downloadFile({
                    fromUrl: source.uri,
                    toFile: fileCachePath
                }).promise.then((response) => {
                    console.log("Response==985==>", response);
                    setLocalSource({ uri: fileCachePath })
                    setFailedToLoad(false)
                    setLoadSuccess(true)
                }).catch((error) => {
                    console.log('Error-5--123>', error);
                    setFailedToLoad(true)
                    setLoadSuccess(false)
                })
            }
        }).catch((error) => {
            console.log("Error---852->", error);
            setFailedToLoad(true)
            setLoadSuccess(false)
        })
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
                <ImageBackground source={placeholderImage}
                    style={style ? style : [styles.defaultImageStyle, defaultImageStyle]}
                >
                    <Image
                        source={localSource}
                        resizeMode={resizeMode || "cover"}
                        onError={(e) => {
                            console.log("image error-->", (e))
                            setFailedToLoad(true)
                            setLoadSuccess(false)
                        }}
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
        <View style={{ marginVertical: 10 }}>
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
