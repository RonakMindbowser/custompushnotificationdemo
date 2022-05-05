import React, { } from 'react';
import { View, Platform } from 'react-native';
import GoogleFitAndroidScreen from './src/GoogleFitAndroidScreen';
import AppleHealthKitIOSScreen from './src/AppleHealthKitIOSScreen';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
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
