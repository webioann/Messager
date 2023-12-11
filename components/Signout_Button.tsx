import { StyleSheet, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { UserContext } from '../context/UserContext';
import { ColorSchemeContext } from '../context/ColorSchemeContext';

const Signout_Button = () => {
    const currentUser = useContext(UserContext)
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useContext(ColorSchemeContext)

    const signoutCurrentUser = () => {
        auth().signOut()
        .then(() => navigation.navigate('Welcome'))
        .catch(error => console.log(`_AUTH_SIGN_OUT_ERROR_ --> ${error}`))
    }
    
    return (
        currentUser && <Pressable onLongPress={signoutCurrentUser} style={[styles.logout, {backgroundColor: COLORS.main}]}>
            <Icon name='logout' size={24} color={COLORS.orange}/>
            <Text style={{color: COLORS.color}}>Logout</Text>
        </Pressable>
    )
}

export default Signout_Button;

const styles = StyleSheet.create({
    logout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 90,
        borderColor: 'red',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
    },
})
