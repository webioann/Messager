import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import NavigationHeader from '../components/NavigationHeader'
import UserAvatarImage from '../components/UserAvatarImage'
import Menu from '../components/Menu'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

import { UserContext } from '../context/UserContext';
import { ColorSchemeContext } from '../context/ColorSchemeContext';


const Profile_Screen = () => {
    const currentUser = useContext(UserContext)
    const { COLORS } = useContext(ColorSchemeContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [filePath, setFilePath] = useState<string | undefined>(undefined)

    const saveAllChanges = () => {console.log('SAVE CHANGES')}

    const openGalleryAndChoosePhoto = async() => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then((file) => { setFilePath(Platform.OS === 'ios' ? file.sourceURL : file.path) });
    }
    const getCleanUpScreen = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPhone('')
        setFilePath(undefined)
    }


    return (
        <ScreenWrapper>
            <NavigationHeader title='Edit Profile'/>
            <View style={{alignItems: 'center'}}>
                <View style={{position: 'relative'}}>
                    <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={150}/>
                    <TouchableOpacity 
                        onPress={openGalleryAndChoosePhoto}
                        style={[styles.photo_editor, {backgroundColor: COLORS.minor}]}>
                        <Icon2 name='camera' size={20} color={COLORS.blue}/>
                    </TouchableOpacity>
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
                        placeholder={currentUser?.phoneNumber ? currentUser?.phoneNumber : 'phone ...'}
                        cursorColor={COLORS.color}
                        placeholderTextColor={COLORS.color}
                    />
                </View>
                <TouchableOpacity 
                    onPress={saveAllChanges} 
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