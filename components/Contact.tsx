import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import UserAvatarImage from './UserAvatarImage';
import GetStartChatting from './GetStartChatting';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserType } from '../Types/users_types';
import useColorSchemeContext from '../hooks/useColorSchemeContext';

const Contact: React.FC<UserType> = (contact) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={styles.contact_item}>
            <UserAvatarImage pathToImage={contact.photoURL} size={50}/>
            <View style={{flex: 1}}>
                <Text style={{color: COLORS.color}}>
                    {contact.displayName}
                </Text>
                <Text style={{color: COLORS.color, fontSize: 13}}>
                    {contact.phoneNumber}
                </Text>
            </View>
            <GetStartChatting {...contact}/>
            <TouchableOpacity 
                onPress={() => console.log('Call choozed contact')}>
                <Icon2 name='phone' size={24} color={COLORS.tint}/>
            </TouchableOpacity>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    contact_item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5
    },
});
