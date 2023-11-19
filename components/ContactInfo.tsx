import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserAvatarImage from '../components/UserAvatarImage';
import { defaultAvatar } from '../constants/dummyMessages';
import { COLORS, SIZES, G } from '../constants/SIZES';
import { Contact_Type } from '../Types/main_types';

type ContactInfoProp = {
    info: Contact_Type
}

const ContactInfo: React.FC<Contact_Type> = ({...data}) => {
    return (
        <View style={styles.contact_item}>
            <UserAvatarImage pathToImage={data.photo_URL} size={50}/>
            <View>
                <Text style={{color: COLORS.LIGHT}}>
                    {data.contact_name}
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 13}}>
                    {data.phone_number}
                </Text>
            </View>
        </View>
    )
}

export default ContactInfo

const styles = StyleSheet.create({
    contact_item: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 5
    },

})