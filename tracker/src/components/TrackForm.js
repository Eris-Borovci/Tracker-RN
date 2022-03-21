import React, { useContext } from "react";
import  { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";
import { navigate } from "../navigationRef";

const TrackForm = () => {
    const [saveTrack] = useSaveTrack();

    const { 
        state: { name, recording, locations },
        startRecording,
        stopRecording,
        changeName,
        reset
     } = useContext(LocationContext);

    return (
        <View style={{ marginTop: 10 }}>
            <Input
                label="Track Name"
                value={name}
                onChangeText={changeName}
            />

            <Spacer>
                {!recording
                    ? <Button onPress={startRecording} title="Start Recording" type="outline" />
                    : <Button onPress={stopRecording} title="Stop" type="outline" titleStyle={{ color: 'red' }} buttonStyle={{ borderColor: 'red' }}/>
                }
            </Spacer>
            {!recording && locations.length > 0
            ? <Spacer><Button onPress={() => {
                saveTrack();
                reset();
                navigate('TrackList');
            }} title="Save Recording" type="outline" titleStyle={{ color: 'green' }} buttonStyle={{ borderColor: 'green' }} /></Spacer>
            : null
            }
        </View>
    )
}

export default TrackForm;