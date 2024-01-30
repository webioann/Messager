import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import NavigationHeader from '../components/NavigationHeader';
// import ProfileFieldEditor from '../components/ProfileFieldEditor';
import UserAvatarImage from '../components/UserAvatarImage'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadImageInStorage from '../components/UploadImageInStorage'
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const Profile_Screen = () => {
    const { currentUser, restartAuthState } = useUserContext()
    const { COLORS } = useColorSchemeContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    const [imageURL, setImageURL] = useState<string | undefined>(undefined)

    const getCleanUpScreen = () => {
        setName('')
        setEmail('')
        setPhone('')
        setGender('')
        setDateOfBirth('')
        setImageURL(undefined)
        Keyboard.dismiss
    }

    const genderFieldValidation = () => {
        let validGender = 'not defined'
        if(gender === 'male') {
            validGender = 'male'
        }
        if(gender === 'female') {
            validGender = 'female'
        }
        return validGender;
    }

    const confirmChangesOnUserProfile = async() => {
        try{
            const user = auth().currentUser
            if(currentUser && user) {
                await user.updateProfile({// <--- update profile data inside Firebase Auth
                    displayName: name.length > 3 ? name : currentUser.displayName,
                    photoURL: imageURL ? imageURL : currentUser.photoURL,
                })
                user.email && await user.updateEmail( // <--- update email data inside Firebase Auth
                    email.length > 8 || user.email ? email : user.email // TODO: need RegExp validation method for email
                )
                await firestore().collection('USERS_DB').doc(currentUser.uid).set({// <--- update User on Storage DB
                    // displayName: user.displayName,
                    // email: user.email,
                    // photoURL: user.photoURL,
                    // uid: user.uid,
                    phoneNumber: phone.length > 7 ? phone : currentUser.phoneNumber,
                    gender: genderFieldValidation(),
                    dateOfBirth: dateOfBirth.length > 5 ? dateOfBirth : currentUser.dateOfBirth
                })
                // await firestore().collection('USERS_DB').doc(currentUser.uid).set({// <--- update User on Storage DB
                //     displayName: name.length > 3 ? name : currentUser.displayName,
                //     email: email.length > 7 ? email : currentUser.email,
                //     photoURL: imageURL ? imageURL : currentUser.photoURL,
                //     uid: currentUser.uid,
                //     phoneNumber: phone.length > 7 ? phone : null,
                //     gender: genderFieldValidation(),
                //     dataOfBirth: dataOfBirth.length > 5 ? dataOfBirth : 'not defined'
                // })

                .then(() => getCleanUpScreen())
                .then(() => restartAuthState())
            }
        } 
        catch {(error: Error) => {console.log(`_ERROR_ON_TIME_USER_PROFILE_DATA_CHANGING --> ${error.message}`)}}
        finally {() => getCleanUpScreen()}
    }

    return (
        <ScreenWrapper>
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
                                <UploadImageInStorage getImageURL={setImageURL} storageFolder='avatars'>
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
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                                secureTextEntry
                                placeholder={currentUser?.phoneNumber ? currentUser.phoneNumber : '+38 (0XX) XXX XX XX'}
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
                                value={dateOfBirth}
                                onChangeText={(value) => setDateOfBirth(value)}
                                placeholder={currentUser?.dateOfBirth}
                                cursorColor={COLORS.color}
                                placeholderTextColor={COLORS.color}
                            />
                        </View>

                        <TouchableOpacity 
                            onPress={() => console.log('PROFILE IS SAVED')} 
                            style={[styles.button, {backgroundColor: COLORS.orange}]}>
                            <Text style={[styles.button_text, {color: COLORS.white}]}>Save changes</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Profile_Screen

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