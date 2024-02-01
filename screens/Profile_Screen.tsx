import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect, createRef } from 'react'
import ScreenWrapper from './ScreenWrapper'
import NavigationHeader from '../components/NavigationHeader';
// import ProfileFieldEditor from '../components/ProfileFieldEditor';
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
    // collected phone number by parts

    const getCleanUpScreen = () => {
        setImage(undefined)
        setName('')
        setEmail('')
        setPhone('')
        setGender('')
        setBirthDay('')
        Keyboard.dismiss
    }

    const genderFieldValidation = (prevGender: GenderType) => {
        let validGender = prevGender
        // changes were not yet
        if(gender.length < 4 && prevGender === 'not defined') { return }
        // were changes but input is empty
        if(gender.length < 4 && prevGender === 'male') { validGender = 'male' }
        if(gender.length < 4 && prevGender === 'female') { validGender = 'female' }
        // incorrect input value
        if(gender.length > 3 && gender !== 'female' || 'male') { validGender = prevGender }
        // correct input value
        if(gender === 'male') { validGender = 'male' }
        if(gender === 'female') { validGender = 'female' }
        return validGender;
    }

    const phonenumberValidation = (prevPhoneNumber: string) => {
        let correctNumber = prevPhoneNumber;
        // changes were not yet
        if(phone.length < 12 && prevPhoneNumber === 'not defined') { return }
        // has an old correct phone but the input number is  short
        if(phone.length < 12 && prevPhoneNumber !== 'not defined') { correctNumber = prevPhoneNumber  }
        // if(phone.length < 4 && prevPhoneNumber === 'female') { correctNumber = 'female' }
        // // incorrect input value
        // if(gender.length > 3 && gender !== 'female' || 'male') { validGender = prevGender }
        // // correct input value
        // if(gender === 'male') { validGender = 'male' }
        // if(gender === 'female') { validGender = 'female' }
        return correctNumber;

    }

    // const phoneTranformation = () => {
    //     setPhone('+38(0')
    //     // const operatorCodePattern = /\+38(0\d\d/;
    //     if(phone.length == 6) {
    //         setPhone(prev => prev+') ')
    //     }
    //     if(phone.length == 8) {
    //         setPhone(prev => prev+') ')
    //     }
    //     if(phone.length == 13) {
    //         setPhone(prev => prev+' ')
    //     }
    //     if(phone.length == 15) {
    //         setPhone(prev => prev+' ')
    //     }
    // }

    const collectPhoneNumber = () => {

    }

    const updateUserNameOrImage = async (user: FirebaseAuthTypes.User) => {
        if(image || name.length > 4) {
            await user.updateProfile({
                displayName: name.length > 3 ? name : user.displayName,
                photoURL: image
            })
        }
        else return
    }

    const updateUserEmail = async (user: FirebaseAuthTypes.User) => {
        if(email.length > 8) {
            user.email && await user.updateEmail( 
            user.email ? email : user.email 
            )
        }
        else return
    }

    const updateUserFirestore = async (user: FirebaseAuthTypes.User) => {
        if(user && currentUser) {
            await firestore().collection('USERS_DB').doc(currentUser.uid).set({
                photoURL: image ? image : currentUser.photoURL,
                displayName: name.length > 3 ? name : currentUser.displayName,
                email: email.length > 7 ? email : currentUser.email,
                uid: user.uid,
                phoneNumber: phone.length > 7 ? phone : 'not defined',
                gender: genderFieldValidation(currentUser.gender),
                dateOfBirth: birthday.length > 5 ? birthday : 'not defined'
            })
        }
        else return
    }

    const confirmChangesOnUserProfile = async() => {
        try{
            const user = auth().currentUser
            if(user && currentUser) {
                // update on Firebase Auth user name and avatar URL
                await updateUserNameOrImage(user)
                // if(image || name.length > 4) {
                //     await user.updateProfile({
                //         displayName: name.length > 3 ? name : user.displayName,
                //         photoURL: image
                //     })
                // }
                // update user email in Firebase Auth 
                await updateUserEmail(user)
                // if(email.length > 8) {
                //     user.email && await user.updateEmail( 
                //     user.email ? email : user.email 
                //     )
                // }
                // update User profile state on Firebase Storage DB
                await firestore().collection('USERS_DB').doc(currentUser.uid).set({
                    photoURL: image ? image : currentUser.photoURL,
                    displayName: name.length > 3 ? name : currentUser.displayName,
                    email: email.length > 7 ? email : currentUser.email,
                    uid: user.uid,
                    phoneNumber: phone.length > 7 ? phone : 'not defined',
                    gender: genderFieldValidation(currentUser.gender),
                    dateOfBirth: birthday.length > 5 ? birthday : 'not defined'
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
                    behavior={Platform.OS === 'ios' ? 'padding': 'height'}
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
                        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
                            <Text style={[styles.label, {color: COLORS.adorn}]}>Username</Text>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={name}
                                onChangeText={(value) => setName(value)}
                                placeholder={currentUser?.displayName ? currentUser.displayName : 'name ...'}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </View>

                        {/* email edit */}
                        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
                            <Text style={[styles.label, {color: COLORS.adorn}]}>Email</Text>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                placeholder={currentUser?.email ? currentUser.email : 'email ...'}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </View>
                        {/* phone number edit */}
                        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
                            <Text style={[styles.label, {color: COLORS.adorn}]}>Phone</Text>
                            <TextInput
                                keyboardType='numeric'
                                defaultValue='+38 (067) 123 45 67'
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                onFocus={() => console.log('FOCUS OLD')}
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                                placeholder={currentUser?.phoneNumber !== 'not defined' ? currentUser.phoneNumber : '+38 (000) 000 00 00 '}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </View>

                        {/* gender field */}
                        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
                            <Text style={[styles.label, {color: COLORS.adorn}]}>Gender</Text>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={gender}
                                onChangeText={(value) => setGender(value)}
                                placeholder={currentUser?.gender}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </View>
                        {/* date of birth field */}
                        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
                            <Text style={[styles.label, {color: COLORS.adorn}]}>Date of Birth</Text>
                            <TextInput
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={birthday}
                                onChangeText={(value) => setBirthDay(value)}
                                placeholder={currentUser?.dateOfBirth !== 'not defined' ? currentUser.dateOfBirth : '00/00/0000'}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </View>

                        <TouchableOpacity 
                            onPress={onClick} 
                            // onPress={confirmChangesOnUserProfile} 
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
// TODO: REMOVE THIS LATER
// type register<T, S> = {
//     value: T
//     error: S
// }
// interface IProfile {
//     image: register<string | undefined, string>
//     name: register<string, string>    
//     email: register<string, string>    
//     phone: register<string, string>   
//     gender: register<string, string>  
//     birthday: register<string, string>
// }

    // let O = {value: '', error: ''}

    // const [profile, setProfile] = useState<IProfile>({
    //     image: {value: undefined, error: ''},
    //     name: {value: '', error: ''},
    //     email: {value: '', error: ''},
    //     phone: {value: '', error: ''},
    //     gender: {value: '', error: ''},
    //     birthday: {value: '', error: ''},
    // })


const styles = StyleSheet.create({
    field: {
        borderBottomWidth: 1,
        marginVertical: 8
    },
    user_name: {
        fontSize: 24,
        fontWeight: '500' 
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
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