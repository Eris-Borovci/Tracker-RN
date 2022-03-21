// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, StatusBar, Platform, Linking } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Map from '../components/Map';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import useLocation from '../hooks/useLocation';
import { withNavigationFocus } from 'react-navigation';
import TrackForm from '../components/TrackForm';
import { Context as LocationContext } from '../context/LocationContext';
import { Entypo } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording])
    const [error] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={[Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight }: null]}>
            <Text style={{textAlign:'center', marginBottom: 20}} h3>Create a Track</Text>
            <Map />
            { error ? 
             <Spacer>
                <Button
                    title="Please enable always on location permission"
                    onPress={() => Linking.openSettings()}
                    type="clear"
                />
             </Spacer>
             :  <Spacer>
                    <TrackForm />
                </Spacer> }
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions= {
    title: 'Add Track',
    tabBarIcon: <Entypo name="plus" size={24} />
}

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);