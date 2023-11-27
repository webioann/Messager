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
import { Contact_Type } from '../Types/main_types';

interface IUser {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
}


const ContactInfo: React.FC<IUser> = (data) => {
    const user = useContext(UserContext)
    const navigation = useNavigation<UseNavigation_Type>();


    const startChatting = () => {
        if(user?.uid) {
            let contactShortUID = data.uid.slice(0,10)
            let userShortUID = user.uid.slice(0,10)
            let roomID = userShortUID?.concat('_@_', contactShortUID)
            Alert.alert(roomID) 
        } else { Alert.alert('You must register for chatting') }
    }
    return (
        <View style={styles.contact_item}>
            <UserAvatarImage pathToImage={data.photoURL} size={50}/>
            <View style={{flex: 1}}>
                <Text style={{color: COLORS.LIGHT}}>
                    {data.displayName}
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 13}}>
                    {data.phoneNumber}
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
                onPress={() => navigation.navigate("ContactEdit")}>
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