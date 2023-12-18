import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './ScreenWrapper';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import NavigationHeader from '../components/NavigationHeader';
import { SIZES } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigatorParams } from '../Types/navigation_types';
import firestore from '@react-native-firebase/firestore';

type StackProps = NativeStackScreenProps<StackNavigatorParams, 'EditContact'>


const EditContact_Screen: React.FC<StackProps> = ({ route }) => {
    const { COLORS } = useColorSchemeContext()
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
        <ScreenWrapper>
            <View style={styles.container}>
                <NavigationHeader type='goBack' screen='EditContact'/>
                <View style={{alignItems: 'center', paddingVertical: SIZES.GAP}}>
                    <Image 
                        source={{uri: contact.photoURL}}
                        style={styles.contactAvatar}
                        alt='contact avatar'
                        resizeMode='contain'
                    />
                    <Text style={[styles.name, {color: COLORS.color}]}>{ contact.displayName }</Text>
                    <Text style={[styles.email, {color: COLORS.color}]}>{ contact.email }</Text>
                    { contact.phoneNumber
                        ? <Text style={[styles.phone, {color: COLORS.color}]}>Phone: {contact.phoneNumber }</Text> 
                        : <Text style={[styles.phone, {color: COLORS.color}]}>Phone not correct</Text> 
                    }
                    <TextInput 
                        style={[styles.numberInput, {color: COLORS.color}]}
                        onChangeText={(number) => setNewNumber(number.toString())}
                        value={newNumber}
                        keyboardType='numeric'
                        // placeholder='+380 ( _ _ ) _ _ _ - _ _ - __'
                        placeholderTextColor={COLORS.tint}
                        cursorColor={COLORS.color}
                    />
                    <TouchableOpacity onPress={updatePhoneNumber}>
                        <Icon name='beenhere' color={COLORS.color} size={34}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default EditContact_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contactAvatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20
    },
    name: {
        fontSize: 30,
        letterSpacing: 6
    },
    email: {
        fontSize: 20,
        letterSpacing: 4,
        fontWeight: '300'
    },
    numberInput: {
        fontSize: 30,
        backgroundColor: 'blue',
        width: 300
    }, 
    phone: {
        fontSize: 30,
        width: '100%'
    }
});
