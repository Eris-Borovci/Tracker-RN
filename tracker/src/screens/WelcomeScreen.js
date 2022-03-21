import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text h2>Welcome</Text>
            </View>
            <View style={styles.options}>
                <Spacer>
                    <Button
                        title="Sign Up"
                        buttonStyle={{ width: '100%' }}
                        onPress={() => navigation.navigate('Signup')}
                    />
                </Spacer>
                <Spacer>
                    <Button
                        title="Sign In"
                        buttonStyle={{ width: '100%' }}
                        onPress={() => navigation.navigate('Signin')}
                    />
                </Spacer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    options: {
        flex: 0.5,
        justifyContent: 'center',
        // alignItems: 'center'
    }
})

export default WelcomeScreen;