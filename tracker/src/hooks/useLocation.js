import { useState, useEffect } from 'react';
import { 
    requestBackgroundPermissionsAsync,
    requestForegroundPermissionsAsync,
    getForegroundPermissionsAsync,
    getBackgroundPermissionsAsync,
    watchPositionAsync,
    Accuracy
 } from 'expo-location';
 import { Alert } from 'react-native';

export default (shouldTrack, callback) => {
    const [error, setError] = useState(null);
    // const [subscriber, setSubscriber] = useState(null);

    const startWatching = async () => {
        try {
            const permissionForeground = await getForegroundPermissionsAsync();
            const permissionBackground = await getBackgroundPermissionsAsync();

            if(!permissionForeground.granted && permissionForeground.canAskAgain){
                await requestForegroundPermissionsAsync();
                setError(null);
            } else {
                setError("No Permission");
            }

            if(!permissionBackground.granted && permissionBackground.canAskAgain){
                await requestBackgroundPermissionsAsync();
                setError(null);
            } else {
                setError("No Permission")
            }
        } catch (err) {
            setError(err)
        }
    }

    const permissionCheck = async () => {
        const permissionForeground = await getForegroundPermissionsAsync();
        const permissionBackground = await getBackgroundPermissionsAsync();

        if(!permissionForeground.canAskAgain || !permissionBackground.canAskAgain){
            setError("Error");
            return;
        }

        if(!permissionForeground.granted && permissionForeground.canAskAgain || !permissionBackground.granted && permissionBackground.canAskAgain){
            Alert.alert("Location Permission",
            "Please enable always on location permission to make app work correctly",
            [
                {
                    text: 'Okay',
                    onPress: () => {
                        startWatching();
                    },
                }
            ]
            )
        }
    }

    
    useEffect(() => {
        permissionCheck();
    }, [])
    
    useEffect(() => {
        let subscriber;

        const locationEvent = async () => {
            try {
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 5,   
                },
                callback // Reading the tips it means that we have to put this callback prop to []
                );
            } catch (error) {
                console.log(error)
            }
        } 

        if(shouldTrack){
            locationEvent();
        } else {
            if(subscriber){
                subscriber.remove();
            }
            subscriber = null;
        }
        
        return () => {
            if(subscriber){
                subscriber.remove();
            }
        }

        // From reading the tips we should have imported subscriber inside [] but the reason we shouldn't is that
        // we get subscriber when we run the location event
        // so to handle that confusing thing we are gonna change the subscriber variable to let variable
    }, [shouldTrack, callback])
    
    
    return [error];
};