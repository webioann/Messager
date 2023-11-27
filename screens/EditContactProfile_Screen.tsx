import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { UserContext } from '../context/UserContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams, UseNavigation_Type } from '../Types/navigation_types';
import firestore from '@react-native-firebase/firestore';

type StackProps = NativeStackScreenProps<RootStackParams, 'EditContactProfile'>


const EditContactProfile_Screen: React.FC<StackProps> = ({ route }) => {
    const navigation = useNavigation<UseNavigation_Type>();
    // const USER = useContext(UserContext)
    const {contact} = route.params;
    const [newNumber, setNewNumber] = useState('')

    const updatePhoneNumber = async() => {
        firestore()
        .collection('USERS_DB')
        .doc(contact.uid)
        .update({
            phoneNumber: newNumber
        })
        .then(() => {
            console.log('Number updated!');
        });
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.BG}}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
                    <Icon name='chevron-left' size={40} color={COLORS.LIGHT}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center', paddingVertical: SIZES.GAP}}>
                    <Image 
                        source={{uri: contact.photoURL}}
                        style={styles.contactAvatar}
                        alt='contact avatar'
                        resizeMode='contain'
                    />
                    <Text style={styles.name}>{ contact.displayName }</Text>
                    <Text style={styles.email}>{ contact.email }</Text>
                    { contact.phoneNumber
                        ? <Text style={styles.phone}>Phone: {contact.phoneNumber }</Text> 
                        : <Text style={styles.phone}>Phone not correct</Text> 
                    }
                    <TextInput 
                        style={styles.numberInput}
                        onChangeText={(number) => setNewNumber(number.toString())}
                        value={newNumber}
                        keyboardType='numeric'
                        // placeholder='+380 ( _ _ ) _ _ _ - _ _ - __'
                        placeholderTextColor={COLORS.GREY}
                        cursorColor={COLORS.LIGHT}
                    />
                    <TouchableOpacity onPress={updatePhoneNumber}>
                        <Icon name='beenhere' color={COLORS.LIGHT} size={34}/>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EditContactProfile_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.GAP,
    },
    contactAvatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20
    },
    name: {
        color: COLORS.LIGHT,
        fontSize: 30,
        letterSpacing: 6
    },
    email: {
        color: COLORS.LIGHT,
        fontSize: 20,
        letterSpacing: 4,
        fontWeight: '300'
    },
    numberInput: {
        fontSize: 30,
        color: COLORS.LIGHT,
        backgroundColor: 'blue',
        width: 300
    }, 
    phone: {
        fontSize: 30,
        color: COLORS.LIGHT,
        width: '100%'
    }
});
