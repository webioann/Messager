import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import UserAvatarImage from '../components/UserAvatarImage';
import { defaultAvatar } from '../constants/dummyMessages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, G } from '../constants/SIZES';

interface IUser {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
}

const ContactInfo: React.FC<IUser> = (contact) => {
    const currentUser = useContext(UserContext)
    const navigation = useNavigation<UseNavigation_Type>();

    const startChatting = () => {
        if(currentUser?.uid) {
            let roomID = ''
            if( contact.uid > currentUser.uid ) {
                roomID = contact.uid.slice(0,8).concat('_@_', currentUser.uid.slice(0,8))
            }
            if( currentUser.uid > contact.uid ) {
                roomID = currentUser.uid.slice(0,8).concat('_@_', contact.uid.slice(0,8))
            }
            Alert.alert(roomID) 

        } 
        else { Alert.alert('You must register for chatting') }
    }

    return (
        <View style={styles.contact_item}>
            <UserAvatarImage pathToImage={contact.photoURL} size={50}/>
            <View style={{flex: 1}}>
                <Text style={{color: COLORS.LIGHT}}>
                    {contact.displayName}
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 13}}>
                    {contact.phoneNumber}
                </Text>
            </View>
            <TouchableOpacity 
                onPress={startChatting}>
                <Icon2 name='message-outline' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => console.log('Call choozed contact')}>
                <Icon2 name='phone' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {navigation.navigate("EditContactProfile", {contact: contact})}}>
                <Icon name='edit' size={20} color={COLORS.LIGHT}/>
            </TouchableOpacity>
        </View>
    )
}

export default ContactInfo

const styles = StyleSheet.create({
    contact_item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5
    },

})

// displayName: data.displayName,
// email: data.email, 
// photoURL: data.photoURL, 
// phoneNumber: data.phoneNumber, 
// uid: data.uid 
