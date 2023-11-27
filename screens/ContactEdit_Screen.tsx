import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../context/UserContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams, UseNavigation_Type } from '../Types/navigation_types';

type StackProps = NativeStackScreenProps<RootStackParams, 'ContactEdit'>


const ContactEdit_Screen: React.FC<StackProps> = ({ route }) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const USER = useContext(UserContext)
    const {displayName, email, photoURL, phoneNumber} = route.params;


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.BG}}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
                    <Icon name='chevron-left' size={40} color={COLORS.LIGHT}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center', paddingVertical: SIZES.GAP}}>
                    <Image 
                        source={{uri: photoURL}}
                        style={styles.contactAvatar}
                        alt='contact avatar'
                        resizeMode='contain'
                    />
                    <Text style={styles.name}>{ displayName }</Text>
                    <Text style={styles.email}>{ email }</Text>
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
