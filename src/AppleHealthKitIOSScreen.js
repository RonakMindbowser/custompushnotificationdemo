import React, { useEffect, } from 'react';
import { Text, View, } from 'react-native';
import AppleHealthKit from 'react-native-health'

const AppleHealthKitIOSScreen = () => {

    useEffect(() => {
        checkAppleHealthKitAvaibility()
    }, [])

    /**
     * Check for Healthkit availability
     */
    const checkAppleHealthKitAvaibility = async () => {
        AppleHealthKit.isAvailable((err, available) => {
            console.log("isAvailable --->", available);
            console.log("err -isAvailable-->", err);

            if (available) {
                initializeHealthKit()
            }
            else {
                alert("Apple HelathKit is not available")
            }
        })
    }

    const permissionsList = [
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.BodyMassIndex,
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
        AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
        AppleHealthKit.Constants.Permissions.Weight,
        AppleHealthKit.Constants.Permissions.Height,
    ]
    const initOptions = {
        permissions: {
            read: permissionsList,
            write: permissionsList,
        },
    }

    const initializeHealthKit = async () => {
        AppleHealthKit.initHealthKit(
            (initOptions),
            (err, results) => {
                console.log("available initHealthKit--->", results);
                console.log("err ---initHealthKit>", err);
                handlePressGetAuthStatus()
            },
        )
    }

    const handlePressGetAuthStatus = () => {
        AppleHealthKit.getAuthStatus(initOptions, (err, result) => {
            console.log("result 123 --->", result);
            console.log("err --->", err);
            if (result.permissions) {
                retriveStepsForGivenPeriod()
                getHeartRateAndBloodPressureData()
                getHeightAndWeight()
            }
        });
    };

    const yesterday = () => {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString();
    };

    let yesterdayDate = yesterday();
    let todayDate = new Date().toISOString();

    const retriveStepsForGivenPeriod = () => {
        let options = {
            startDate: yesterdayDate, // required
            endDate: todayDate // optional; default now
        };

        //Query for total steps per day over a specified date range. The options object is used to setup a query to retrieve relevant samples.
        AppleHealthKit.getDailyStepCountSamples(
            (options),
            (err, results) => {
                console.log("err-getDailyStepCountSamples-->", err);
                console.log("results--getDailyStepCountSamples->", results);
            },
        )

        let options2 = {
            date: todayDate, // optional; default now
            includeManuallyAdded: false, // optional: default true
        }

        AppleHealthKit.getStepCount(
            (options2),
            (err, results) => {
                console.log("err-getStepCount-->", err);
                console.log("results--getStepCount->", results);
            },
        )
    }

    const getHeartRateAndBloodPressureData = async () => {
        console.log("Checking for heart rate ");
        let options = {
            unit: 'mmhg', // optional; default 'mmhg'
            startDate: yesterdayDate, // required
            endDate: todayDate, // optional; default now
            ascending: false, // optional; default false
            // limit: 10, // optional; default no limit
        }

        AppleHealthKit.getBloodPressureSamples(
            options,
            (err, results) => {
                console.log("err-getBloodPressureSamples-->", err);
                console.log("results--getBloodPressureSamples->", results);
            },
        )

        let options2 = {
            unit: 'bpm', // optional; default 'bpm'
            startDate: yesterdayDate, // required
            endDate: todayDate, // optional; default now
            ascending: false, // optional; default false
            limit: 10, // optional; default no limit
        }

        AppleHealthKit.getHeartRateSamples(
            options2,
            (err, results) => {
                console.log("err-getHeartRateSamples-->", err);
                console.log("results--getHeartRateSamples->", results);
            },
        )
    }
    // bpm = 'bpm',
    // calorie = 'calorie',
    // celsius = 'celsius',
    // count = 'count',
    // day = 'day',
    // fahrenheit = 'fahrenheit',
    // foot = 'foot',
    // gram = 'gram',
    // hour = 'hour',
    // inch = 'inch',
    // joule = 'joule',
    // kilocalorie = 'kilocalorie',
    // meter = 'meter',
    // mgPerdL = 'mgPerdL',
    // mile = 'mile',
    // minute = 'minute',
    // mmhg = 'mmhg',
    // mmolPerL = 'mmolPerL',
    // percent = 'percent',
    // pound = 'pound',
    // second = 'second',
    const getHeightAndWeight = () => {
        let options = {
            unit: 'foot', // optional; default 'inch'
            startDate: yesterdayDate, // required
            endDate: todayDate, // optional; default now
            ascending: false, // optional; default false
            limit: 10, // optional; default no limit
        }
        AppleHealthKit.getHeightSamples(
            options,
            (err, results) => {
                console.log("err-getHeightSamples-->", err);
                console.log("results--getHeightSamples->", results);
            },
        )

        AppleHealthKit.getLatestHeight({
            unit: "foot"
        }, (err, results) => {
            console.log("err-getLatestHeight-->", err);
            console.log("results--getLatestHeight->", results);
        })

        AppleHealthKit.getLatestWeight({
            unit: AppleHealthKit.Constants.Units.pound
        }, (err, results) => {
            console.log("err-getLatestWeight-->", err);
            console.log("results--getLatestWeight->", results);
        })

        let options2 = {
            unit: 'pound', // optional; default 'pound'
            startDate: yesterdayDate, // required
            endDate: todayDate, // optional; default now
            ascending: false, // optional; default false
            limit: 10, // optional; default no limit
        }
        AppleHealthKit.getWeightSamples(
            options2,
            (err, results) => {
                console.log("err-getWeightSamples-->", err);
                console.log("results--getWeightSamples->", results);
            },
        )
    }

    return (
        <View>
            <Text style={{ color: "black" }}>AppleHealthKitIOSScreen</Text>
        </View>
    )
}

export default AppleHealthKitIOSScreen;
