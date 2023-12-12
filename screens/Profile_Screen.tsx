import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import NavigationHeader from '../components/NavigationHeader'
import UserAvatarImage from '../components/UserAvatarImage'
import Menu from '../components/Menu'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Button_Signout from '../components/Signout_Button'
import UploadImageInStorage from '../components/UploadImageInStorage'
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const Profile_Screen = () => {
    const { currentUser } = useUserContext()
    const { COLORS } = useColorSchemeContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [imageURL, setImageURL] = useState<string | undefined>(undefined)

    const getCleanUpScreen = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPhone('')
        setImageURL(undefined)
    }

    const confirmChangesOnUserProfile = async() => {
        try{
            currentUser && await firestore().collection('USERS_DB').doc(currentUser.uid).set({// <--- update User on Storage DB
                displayName: name.length > 3 ? name : currentUser.displayName,
                email: email.length > 7 ? email : currentUser.email,
                photoURL: imageURL ? imageURL : currentUser.photoURL,
                uid: currentUser.uid,
                phoneNumber: phone.length > 7 ? phone : null
            })
            let user = auth().currentUser;
            currentUser && user && await user.updateProfile({// <--- update profile data inside Firebase Auth
                displayName: name.length > 3 ? name : currentUser.displayName,
                photoURL: imageURL ? imageURL : currentUser.photoURL
            })
            .then(() => getCleanUpScreen())
        } 
        catch {(error: Error) => {console.log(`_ERROR_ON_TIME_USER_PROFILE_DATA_CHANGING --> ${error.message}`)}}
        finally {() => getCleanUpScreen()}
    }

    return (
        <ScreenWrapper>
            <NavigationHeader title='Edit Profile'>
                <Button_Signout/>
            </NavigationHeader>
            <View style={{alignItems: 'center'}}>
                <View style={{position: 'relative'}}>
                    <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={150}/>
                    <View style={[styles.photo_editor, {backgroundColor: COLORS.minor}]}>
                        <UploadImageInStorage getImageURL={setImageURL} storageFolder='avatars'>
                            <Icon2 name='camera' size={20} color={COLORS.blue}/>
                        </UploadImageInStorage>
                    </View>
                </View>
                <Text style={[styles.user_name, {color: COLORS.color}]}>{currentUser?.displayName}</Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                {/* name edit */}
                <View style={{paddingTop: 10}}>
                    <Text style={[styles.label, {color: COLORS.color}]}>Name</Text>
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
                <View style={{paddingTop: 10}}>
                    <Text style={[styles.label, {color: COLORS.color}]}>Email</Text>
                    <TextInput
                        style={[styles.edit_input, {borderColor: COLORS.tint}]}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder={currentUser?.email ? currentUser.email : 'email ...'}
                        cursorColor={COLORS.color}
                        placeholderTextColor={COLORS.color}
                    />
                </View>
                {/* password edit */}
                <View style={{paddingTop: 10}}>
                    <Text style={[styles.label, {color: COLORS.color}]}>Password</Text>
                    <TextInput
                        style={[styles.edit_input, {borderColor: COLORS.tint}]}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry
                        placeholder={currentUser?.displayName ? currentUser.displayName : 'password ...'}
                        cursorColor={COLORS.color}
                        placeholderTextColor={COLORS.color}
                    />
                </View>
                {/* phone number  */}
                <View style={{paddingTop: 10}}>
                    <Text style={[styles.label, {color: COLORS.color}]}>Phone</Text>
                    <TextInput
                        style={[styles.edit_input, {borderColor: COLORS.tint}]}
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        placeholder={currentUser?.phoneNumber ? currentUser?.phoneNumber : 'phone number not install yet'}
                        cursorColor={COLORS.color}
                        placeholderTextColor={COLORS.color}
                    />
                </View>
                <TouchableOpacity 
                    onPress={confirmChangesOnUserProfile} 
                    style={[styles.button, {backgroundColor: COLORS.orange}]}>
                    <Text style={[styles.button_text, {color: COLORS.white}]}>Save changes</Text>
                </TouchableOpacity>
            </View>
            <Menu/>
        </ScreenWrapper>
    )
}

export default Profile_Screen

const styles = StyleSheet.create({
    user_name: {
        fontSize: 24,
        fontWeight: '600' 
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        paddingBottom: 5
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
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5
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