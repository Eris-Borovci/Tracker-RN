import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ routeName, linkText, navigation }) => {

    return (
        <Spacer>
            <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
                <Text style={styles.link}>{linkText}</Text>
            </TouchableOpacity>
        </Spacer>
    )
}

const styles = StyleSheet.create({
    link: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 16
    }
});

export default withNavigation(NavLink);