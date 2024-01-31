import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
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
    // input fields state 
    const [image, setImage] = useState<string | undefined>(undefined)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthDay] = useState('')


    // check image picker output
    useEffect(() => {
        let empty = '';
        console.log('IMAGE URL -->', image, empty ? "true" : "false")
    }, [image])

    const getCleanUpScreen = () => {
        setImage(undefined)
        setName('')
        setEmail('')
        setPhone('')
        setGender('')
        setBirthDay('')
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
            if(user && currentUser) {
                // update on Firebase Auth user name and avatar URL
                if(image || name.length > 4) {
                    await user.updateProfile({
                        displayName: name.length > 3 ? name : user.displayName,
                        photoURL: image
                    })
                    .then(() => restartAuthState())
                }
                else {return};
                // update user email in Firebase Auth 
                if(email.length > 8) {
                    user.email && await user.updateEmail( 
                    user.email ? email : user.email 
                    )
                    .then(() => restartAuthState())
                }
                else {return};
                // update User profile state on Firebase Storage DB
                await firestore().collection('USERS_DB').doc(currentUser.uid).set({
                    // displayName: name.length > 3 ? name : currentUser.displayName,
                    // email: email.length > 7 ? email : currentUser.email,
                    // photoURL: image ? image : currentUser.photoURL,
                    // uid: currentUser.uid,
                    phoneNumber: phone.length > 7 ? phone : null,
                    gender: genderFieldValidation(),
                    dataOfBirth: birthday.length > 5 ? birthday : 'not defined'
                })
                getCleanUpScreen()
                restartAuthState()
            }
        } 
        catch {(error: Error) => {console.log(`_ERROR_ON_TIME_USER_PROFILE_DATA_CHANGING --> ${error.message}`)}}
        finally {() => getCleanUpScreen()}
    }

    const onClick = () => {
        Alert.alert('PROFILE WAS CHANGED','',[],{cancelable: true})
        getCleanUpScreen()
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
                                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                                secureTextEntry
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