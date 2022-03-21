import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitTextButton }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const passwordFocus = useRef();

    return (
        <>
            <Spacer>
                <Text h4 style={{ textAlign: 'center' }}>{ headerText }</Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                blurOnSubmit={false}
                onSubmitEditing={() => passwordFocus.current.focus()}
                autoCapitalize="none"
            />
            <Input
                ref={passwordFocus}
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onSubmitEditing={() => onSubmit({ email, password })}
            />
            {
                errorMessage ?
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    : null
            }
            <Spacer>
                <Button
                    title={submitTextButton}
                    onPress={() => onSubmit({ email, password })}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
});

export default AuthForm;