import React, { } from 'react';
import { View, Platform } from 'react-native';
import GoogleFitAndroidScreen from './src/GoogleFitAndroidScreen';
import AppleHealthKitIOSScreen from './src/AppleHealthKitIOSScreen';
import RNFitness from './src/RNFitness';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
      {
        Platform.OS == "android" ?
          <GoogleFitAndroidScreen />
          :
          <AppleHealthKitIOSScreen />
      }
      {/* <RNFitness /> */}
    </View>
  )
}

export default App;
