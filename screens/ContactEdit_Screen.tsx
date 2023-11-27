import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../context/UserContext';

const ContactEdit_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const USER = useContext(UserContext)

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.BG}}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
                    <Icon name='chevron-left' size={40} color={COLORS.LIGHT}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center', paddingVertical: SIZES.GAP}}>
                    <Image 
                        source={{uri: USER?.photoURL ? USER.photoURL : ''}}
                        style={styles.contactAvatar}
                        alt='contact avatar'
                        resizeMode='contain'
                    />
                    <Text style={styles.name}>{ USER?.displayName }</Text>
                    <Text style={styles.email}>{ USER?.email }</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ContactEdit_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.GAP,
    },
    contactAvatar: {
        width: 150,
        height: 150,
        borderRadius: 75
    },

    name: {
        color: COLORS.LIGHT,
        fontSize: 45,
    },
    email: {
        color: COLORS.LIGHT,
        fontSize: 20,
    }
});
