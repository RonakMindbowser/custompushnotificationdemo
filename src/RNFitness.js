import React, { useEffect, } from 'react';
import { Text, View, } from 'react-native';
import Fitness from '@ovalmoney/react-native-fitness';

const RNFitness = () => {

    useEffect(() => {
        checkingAuthorization()
    }, [])
    const permissions = [
        { kind: Fitness.PermissionKinds.Steps, access: Fitness.PermissionAccesses.Write },
        { kind: Fitness.PermissionKinds.Steps, access: Fitness.PermissionAccesses.Read },
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Write },
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Read },
    ];

    const yesterday = () => {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString();
    };

    let yesterdayDate = yesterday();
    let todayDate = new Date().toISOString();


    const checkingAuthorization = () => {
        Fitness.isAuthorized(permissions)
            .then((authorized) => {
                // Do something
                console.log("authorized", authorized);
                if (authorized) {
                    retriveStepsCount()
                    retriveHeartRate()
                }
                else {
                    requestForPermission()
                }
            })
            .catch((error) => {
                console.log("error", error);
                // Do something
            });

    }

    const requestForPermission = () => {
        Fitness.requestPermissions(permissions)
            .then((status) => {
                // Do something
                console.log("status", status);
                retriveStepsCount()
                retriveHeartRate()
            })
            .catch((error) => {
                console.log("error requestPermissions", error);
                // Do something
            });
    }

    const retriveStepsCount = () => {
        Fitness.getSteps({
            startDate: yesterdayDate,
            endDate: todayDate,
            interval: "hour",
        }).then((response) => {
            console.log("Response GteSTepcount", response);
        }).catch((error) => {
            console.log("error GteSTepcount", error);
        })
    }

    const retriveHeartRate = () => {
        Fitness.getHeartRate({
            startDate: yesterdayDate,
            endDate: todayDate,
            interval: 'minute',
        }).then((response) => {
            console.log("Response getHeartRate", response);
        }).catch((error) => {
            console.log("error getHeartRate", error);
        })
    }

    return (
        <View>
            <Text style={{ color: "black" }}>RNFitness with Google Fit And Apple Healthkit</Text>
        </View>
    );
}

export default RNFitness;
