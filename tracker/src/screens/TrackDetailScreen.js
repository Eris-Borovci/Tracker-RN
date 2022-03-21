import React, { Context, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');

    const track = state.find(t => t._id === _id);
    const initialCoords = track.locations[0].coords;

    return (
        <View>
            <MapView
                style={{ height: 300 }}
                initialRegion={{
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001,
                    ...initialCoords
                }}
            >
                <Polyline
                    coordinates={track.locations.map(loc => loc.coords)}
                />
            </MapView>
            <Text h4 style={{ textAlign: 'center', marginTop: 15 }}>{ track.name }</Text>
        </View>
    );
};

TrackDetailScreen.navigationOptions = {
    title: 'Track Detail',
    headerTitleAlign: 'center'
}

const styles = StyleSheet.create({});

export default TrackDetailScreen;