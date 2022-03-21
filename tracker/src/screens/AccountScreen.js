import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text h3>Account</Text>
            <Button
                title="Sign Out"
                onPress={() => signout()}
            />
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = {
    tabBarIcon: <MaterialCommunityIcons name="account" size={24} />
}

const styles = StyleSheet.create({});

export default AccountScreen;