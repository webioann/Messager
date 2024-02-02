import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect, createRef } from 'react'
import ScreenWrapper from './ScreenWrapper'
import NavigationHeader from '../components/NavigationHeader';
// import ProfileFieldEditor from '../components/ProfileFieldEditor';
import RowWrapperWithLabel from '../components/RowWrapperWithLabel';
import UserAvatarImage from '../components/UserAvatarImage'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadImageInStorage from '../components/UploadImageInStorage'
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GenderType } from '../Types/users_types';


const Profile_Screen = () => {
    const { currentUser, restartAuthState } = useUserContext()
    const { COLORS } = useColorSchemeContext()
    // input fields state 
    const [image, setImage] = useState<string | undefined>(undefined)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthDay] = useState('')
    // placeholder hint
    const [showHint, setShowHint] = useState(false)
    // country code if need localization
    const countryCode = '+38 0';
    const phoneNumberFormat = '+38 (000) 000 00 00';

    const getCleanUpScreen = () => {
        setImage(undefined)
        setName('')
        setEmail('')
        setPhone('')
        setGender('')
        setBirthDay('')
        Keyboard.dismiss
    }

    const updateAuthUserNameOrImage = async (user: FirebaseAuthTypes.User) => {
        if(image || name.length > 4) {
            await user.updateProfile({
                displayName: name.length > 3 ? name : user.displayName,
                photoURL: image
            })
        }
        else return
    }
    // TODO: fix this - it not change email on Auth console
    const updateAuthUserEmail = async (user: FirebaseAuthTypes.User) => {
        if(email.length > 8) {
            user.email && await user.updateEmail( 
            user.email ? email : user.email 
            )
        }
        else return
    }
    const genderFieldValidation = (previousGender: GenderType) => {
        let validGender = previousGender
        // changes were not yet
        if(gender.length < 4 && previousGender === 'not defined') { return }
        // were changes but input is empty
        if(gender.length < 4 && previousGender === 'male') { validGender = 'male' }
        if(gender.length < 4 && previousGender === 'female') { validGender = 'female' }
        // incorrect input value
        if(gender.length > 3 && gender !== 'female' || 'male') { validGender = previousGender }
        // correct input value
        if(gender === 'male') { validGender = 'male' }
        if(gender === 'female') { validGender = 'female' }
        return validGender;
    }

    const phoneInputValidation = (previousPhone: string) => {
        // if country code = '+380' length = 13 if '+38 0' length = 13
        let correctPhoneNumber = previousPhone
        // changes were not yet
        if(phone.length < 14 && previousPhone === 'not defined') { return }
        // were changes but the input was not full
        if(phone.length < 14 && previousPhone !== 'not defined') { correctPhoneNumber = previousPhone }
        // first input with correct value
        if(phone.length >= 14 && phone === 'not defined') { correctPhoneNumber = phone }
        // change old phone number
        if(phone.length >= 14 && phone !== 'not defined') { correctPhoneNumber = phone }
        return correctPhoneNumber;
    }

    const birthdayInputValidation = (previousBirthdayDate: string) => {
        let correctDateOfBirthday = previousBirthdayDate
        // changes were not yet
        if(birthday.length < 8 && previousBirthdayDate === 'not defined') { return }
        // were changes but the input was not full
        if(birthday.length < 8 && previousBirthdayDate !== 'not defined') { correctDateOfBirthday = previousBirthdayDate }
        // first input with correct value
        if(birthday.length >= 8 && previousBirthdayDate === 'not defined') { 
            let day = birthday.slice(0, 1)
            let month = birthday.slice(2, 3)
            let year = birthday.slice(5, 9)
            correctDateOfBirthday = `${day}/${month}/${year}`
        }
        // change old birthday date
        if(birthday.length >= 8 && previousBirthdayDate !== 'not defined') { 
            let day = birthday.slice(0, 2)
            let month = birthday.slice(2, 4)
            let year = birthday.slice(4, 9)
            correctDateOfBirthday = `${day}/${month}/${year}`
        }
        return correctDateOfBirthday;
    }


    
    const confirmChangesOnUserProfile = async() => {
        try{
            const user = auth().currentUser
            if(user && currentUser) {
                // update on Firebase Auth user name and avatar URL
                await updateAuthUserNameOrImage(user)
                // update user email in Firebase Auth 
                await updateAuthUserEmail(user)
                // update User profile state on Firebase Storage DB
                await firestore().collection('USERS_DB').doc(currentUser.uid).set({
                    photoURL: image ? image : currentUser.photoURL,
                    displayName: name.length > 3 ? name : currentUser.displayName,
                    email: email.length > 7 ? email : currentUser.email,
                    uid: user.uid,
                    phoneNumber: phoneInputValidation(currentUser.phoneNumber),
                    gender: genderFieldValidation(currentUser.gender),
                    dateOfBirth: birthdayInputValidation(currentUser.dateOfBirth)
                })
                getCleanUpScreen()
                restartAuthState()
            }
        } 
        catch {(error: Error) => {console.log(`_ERROR_ON_TIME_USER_PROFILE_DATA_CHANGING --> ${error.message}`)}}
        finally {() => getCleanUpScreen()}
    }

    const onClick = () => {
        // let message = `name: ${name.length}, email: ${email.length}, phone: ${phone.length}, gender: ${gender.length},birthday: ${birthday.length}`;
        // Alert.alert('STATE',message,[],{cancelable: true})
        // getCleanUpScreen()
        let string = '1234567890'
        console.log('PHONE  =', phone)
    }

    return (
        currentUser && <ScreenWrapper>
            <NavigationHeader type='drawer' screen='Profile'/>
            <ScrollView style={{flex: 1}}>
                <KeyboardAvoidingView 
                    // behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                    behavior='position'
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} 
                    style = {{flex: 1}}>
                    {/* AVATAR */}
                    <View style={{alignItems: 'center', marginTop: 10}}>
                        <View style={{position: 'relative'}}>
                            <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={150}/>
                            <View style={[styles.photo_editor, {backgroundColor: COLORS.adorn}]}>
                                <UploadImageInStorage getImageURL={setImage} storageFolder='avatars'>
                                    <Icon2 name='camera' size={20} color={COLORS.color}/>
                                </UploadImageInStorage>
                            </View>
                        </View>
                        <Text style={[styles.user_name, {color: COLORS.color}]}>{currentUser?.displayName}</Text>
                    </View>
                    <View style={{flex: 1, paddingHorizontal: 26}}>
                        {/* name edit */}
                        <RowWrapperWithLabel label='Username'>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={name}
                                onChangeText={(value) => setName(value)}
                                placeholder={currentUser?.displayName ? currentUser.displayName : 'name ...'}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </RowWrapperWithLabel>
                        {/* email edit */}
                        <RowWrapperWithLabel label='Email'>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                placeholder={currentUser?.email ? currentUser.email : 'email ...'}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </RowWrapperWithLabel>
                        {/* phone number edit */}
                        <RowWrapperWithLabel label='Phone'>
                            <TextInput
                                keyboardType='numeric'
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                onFocus={() => setPhone(countryCode)}
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                                placeholder={currentUser?.phoneNumber !== 'not defined' ? currentUser.phoneNumber : phoneNumberFormat}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </RowWrapperWithLabel>
                        {/* gender field */}
                        <RowWrapperWithLabel label='Gender'>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={gender}
                                onChangeText={(value) => setGender(value)}
                                placeholder={currentUser?.gender}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </RowWrapperWithLabel>
                        {/* date of birth field */}
                        <RowWrapperWithLabel label='Date of Birth' hintLabel=' format 01/03/1980' showHint={showHint}>
                            <TextInput
                                keyboardType='numeric'
                                onFocus={() => setShowHint(true)}
                                onBlur={() => setShowHint(false)}
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={birthday}
                                onChangeText={(value) => setBirthDay(value)}
                                placeholder={currentUser?.dateOfBirth !== 'not defined' ? currentUser.dateOfBirth : '00/00/0000'}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </RowWrapperWithLabel>
                        <TouchableOpacity 
                            // onPress={onClick} 
                            onPress={confirmChangesOnUserProfile} 
                            style={[styles.button, {backgroundColor: COLORS.orange}]}>
                            <Text style={[styles.button_text, {color: COLORS.white}]}>Save changes</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Profile_Screen;

const styles = StyleSheet.create({
    user_name: {
        fontSize: 24,
        fontWeight: '500' 
    },
    photo_editor: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    edit_input: {
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        width: '70%',
        alignSelf: 'center',
        borderRadius: 8,
        padding: 10,
        marginTop: 30
    },
    button_text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    }, 
})