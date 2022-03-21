import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import { MaterialIcons  } from '@expo/vector-icons';

const Map = () => {  
    const { state: { currentLocation, locations } } = useContext(LocationContext);
    
    if(!currentLocation){
        return <ActivityIndicator size="large" color="black" style={{ marginTop: 200 }} />
    }

    const [followingCamera, setFollowingCamera] = useState(true);
    const map = useRef();

    const newCamera = {
        center: {
            ...currentLocation.coords
        },
        zoom: 18,
        pitch: 0
    }

    useEffect(() => {
        if(followingCamera){
            map.current.animateCamera(newCamera, { duration: 100 })
        }
    }, [currentLocation])

    return (
        <>
        <MapView
            ref={map}
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }}
            camera={{...currentLocation.coords, pitch: 0, zoom: 15}}
            onTouchStart={() => setFollowingCamera(false)}
        >
            <Circle
                center={currentLocation.coords}
                radius={4}
                strokeColor="rgba(0, 0, 0, 0.5)"
                fillColor="grey"
            />
            
            <Polyline
                coordinates={locations.map(location => location.coords)}
                strokeWidth={3}
            />
        </MapView>
        <TouchableOpacity
            onPress={() => {
                map.current.animateCamera(newCamera, { duration: 2000 });
                setFollowingCamera(true);
            }}
            style={styles.centerBtn}
        >
            <MaterialIcons
                name="gps-fixed"
                size={24}
                color="black"
            />
        </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    map: {
        height: 300,
        position: 'relative'
    },
    centerBtn: {
        position: 'absolute',
        top: 100,
        right: 20,
        padding: 10
    }
});

export default Map;