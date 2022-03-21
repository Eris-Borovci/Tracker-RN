import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = React.useContext(TrackContext);
    
    return <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={fetchTracks} />
        <FlatList
            data={state}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron/>
                        </ListItem>
                    </TouchableOpacity>
                )
            }}
        />
    </View>
};

TrackListScreen.navigationOptions = {
    title: 'Track List',
    headerTitleAlign: 'center'
}

const styles = StyleSheet.create({});

export default TrackListScreen;