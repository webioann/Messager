import { StyleSheet, Text, View, Alert, Pressable } from 'react-native'
import React, { useContext } from 'react'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../context/UserContext';
import { COLORS, G } from '../constants/SIZES';

const Button_Signout = () => {
    const USER = useContext(UserContext)

    const signoutCurrentUser = () => {
        if(USER) {
            auth().signOut()
            .then(() => console.log(`You are logged out and _USER_ --> ${auth().currentUser}`))
            .then(() => Alert.alert('You are logged out'))
            .catch(error => console.log(`_AUTH_ERROR_ --> ${error}`))
        }
        else return
    }
    
    return (
        <Pressable onLongPress={signoutCurrentUser} style={styles.logout}>
            <Icon name='logout' size={24} color={COLORS.LIGHT}/>
            <Text style={{color: COLORS.LIGHT}}>Logout</Text>
        </Pressable>
    )
}

export default Button_Signout;

const styles = StyleSheet.create({
    logout: {
        ...G.row,
        width: 90,
        borderColor: 'red',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        backgroundColor: COLORS.DARK,
    },
})
