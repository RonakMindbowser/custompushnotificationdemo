import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Linking } from 'react-native';
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
const googleFitClientId = "290146831688-pidp57t71u84rgpk6ma8j3obmnns6a9a.apps.googleusercontent.com"
import Share from "react-native-share";

const GoogleFitAndroidScreen = () => {

    useEffect(() => {
        //Check Google fit app is installed or not
        Share.isPackageInstalled('com.google.android.apps.fitness')
            .then((response) => {
                console.log(response);
                if (response.isInstalled) {
                    checkGoogleFitAuthorization()
                }
                else {
                    Alert.alert(
                        "CustomPushNotificationDemo",
                        "Google fit app is not installed.Do you want to install from google play store??",
                        [
                            {
                                text: "Cancel",
                                onPress: () => null
                            },
                            {
                                text: "Okay",
                                onPress: () => {
                                    Linking.openURL("https://play.google.com/store/apps/details?id=com.google.android.apps.fitness")
                                }
                            }
                        ]
                    )
                }
                // { isInstalled: true/false, message: 'Package is Installed' }
            })
            .catch((error) => {
                console.log(error);
                // { error }
            });
    }, [])

    /**
     * First need to check app is authorized or not
     */
    const checkGoogleFitAuthorization = async () => {
        await GoogleFit.checkIsAuthorized();
        console.log(GoogleFit.isAuthorized);

        if (GoogleFit.isAuthorized) {
            retriveStepsForGivenPeriod()
            getHeartRateAndBloodPressureData()
        }
        else {
            requestForAuthorization()
        }
    }

    /**
     * Perform request for authiorization
     */
    const requestForAuthorization = () => {
        // The list of available scopes inside of src/scopes.js file
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_BODY_READ,
                Scopes.FITNESS_BODY_WRITE,
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_HEART_RATE_READ,
                Scopes.FITNESS_HEART_RATE_WRITE,
                Scopes.FITNESS_BLOOD_PRESSURE_READ,
                Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
                Scopes.FITNESS_BLOOD_GLUCOSE_READ,
                Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
            ],
        }
        GoogleFit.authorize(options)
            .then(authResult => {
                console.log("authResult res::", authResult);
                if (authResult.success) {
                    // alert("You are successfully authorized")
                    retriveStepsForGivenPeriod()
                    getHeartRateAndBloodPressureData()
                }
                else {

                }
            })
            .catch((error) => {
                console.log("authResult error::", error);
            })
    }

    const yesterday = () => {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString();
    };

    let yesterdayDate = yesterday();
    let todayDate = new Date().toISOString();

    const options = {
        bucketUnit: BucketUnit.MINUTE,
        bucketInterval: 15,
        endDate: todayDate,
        startDate: yesterdayDate,
    }

    const retriveStepsForGivenPeriod = async () => {

        // Get the total steps per day over a specified date range.
        GoogleFit.getDailyStepCountSamples(options).then((res) => {
            console.log('Daily getDailyStepCountSamples >>> ', res)
        }).catch((err) => {
            console.error(err)
        });

        // A shortcut to get the total steps of a given day by using getDailyStepCountSamples
        GoogleFit.getDailySteps(new Date().toISOString()).then(steps => {
            console.log("Daily getDailySteps:: ", steps);
        }).catch((error) => {
            console.log("Erorr in daily step---->", error);
        })

    }

    const getHeartRateAndBloodPressureData = async () => {
        console.log("Checking for heart rate ");
        try {

            const heartrate = await GoogleFit.getHeartRateSamples(options);
            console.log("heartrate data:: ", heartrate);

            const bloodpressure = await GoogleFit.getBloodPressureSamples(options);
            console.log("bloodpressure data:: ", bloodpressure);

        } catch (error) {
            console.log("Error in heart and blood pressure get data::", error);
        }

    }

    return (
        <View>
            <Text>GoogleFitAndroidScreen</Text>
        </View>
    )
}

export default GoogleFitAndroidScreen;
