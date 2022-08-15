import React, { useEffect, useState } from 'react';
import { View, Platform, ScrollView } from 'react-native';
import GoogleFitAndroidScreen from './src/GoogleFitAndroidScreen';
import AppleHealthKitIOSScreen from './src/AppleHealthKitIOSScreen';
import RNFitness from './src/RNFitness';
// import OTPTextInput from './src/OTPTextInput';
const placeholderImage = require("./src/images/feedPostPlaceholder/feedPostPlaceholder.png")
import {
    OTPTextInput, CustomHeader, CustomButton,
    CustomLoader, iPhoneHelp, scale, verticalScale, moderateScale,
    HelperFunction, CacheImage
} from "react-native-reusable-custom-components"
// import CustomModal from './src/CustomModal';
// import CachedImage from './src/CachedImage';
const App = () => {
    // const [visible, setVisible] = useState(false)
    // useEffect(() => {
    //   checkValidation()
    // }, [])

    // const checkValidation = async () => {
    //   var email = "test@gmail.com"
    //   var isValidmail = await HelperFunction.isValidEmail(email);
    //   console.log("isValidmail-->", isValidmail);

    //   var password = "Test123@"
    //   var validPassword = await HelperFunction.isValidPassword(password);
    //   console.log("validPassword-->", validPassword);
    // }

    const imageList = [
        {
            uri: "https://flerishqa.azurewebsites.net/media/2623/img_20220428t10_2650.jpg",
        },
        {
            uri: "https://flerishqa.azurewebsites.net/media/2619/img_20220426t11_0457.jpeg",
        },
        {
            uri: "https://you.flerish.com/media/2778/img_20220513t11_3528.jpg",
        },
        {
            uri: "https://you.flerish.com/media/2775/img_20220513t09_4317.png",
        },
        {
            uri: "https://you.flerish.com/media/2775/img_202220513t09_4317.png",
        },
    ]

    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
            {/* {
        Platform.OS == "android" ?
          <GoogleFitAndroidScreen />
          :
          <AppleHealthKitIOSScreen />
      } */}
            {/* <RNFitness /> */}
            {/* <CustomHeader
        middleText='Home'
        backButton
      /> */}
            {/* <CustomButton
        title='Next'
        onPress={() => setVisible(true)}
      /> */}
            {/* <OTPTextInput
        otpCount={4}
        onCodeUpdate={(code) => {
          console.log("Code is--->", code)
        }}
        textInputProps={{
          placeholder: "★"
        }}
      /> */}

            {/* <View
        style={{
          marginBottom: iPhoneHelp.isIphoneX() ? 20 : 0
        }}
      />
      <View
        style={{
          marginHorizontal: moderateScale(15),
          marginVertical: verticalScale(20),
          padding: scale(3)
        }}
      /> */}
            {/* <CustomModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
      /> */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 30 }}>
                {
                    imageList.map((obj) => {
                        return (
                            <CacheImage
                                source={{ uri: obj.uri }}
                                style={{ height: 150, width: 150 }}
                                defaultImage={placeholderImage}
                                errorImage={placeholderImage}
                            />
                        )
                    })
                }

                {/* <CachedImage
        // source={{ uri: "https://picsum.photos/id/237/200/300" }}
        source={{ uri: "https://you.flerish.com/media/2778/img_20220513t11_3528.jpg" }}
      // source={{ uri: "https://flerishqa.azurewebsites.net/media/2623/img_20220428t10_2650.jpg" }}
      /> */}
            </ScrollView>
        </View>
    )
}

export default App;
