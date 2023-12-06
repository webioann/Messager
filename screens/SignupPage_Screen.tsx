import { 
    StyleSheet, 
    Text, 
    View, 
    Alert,
    TouchableWithoutFeedback, 
    StatusBar, 
    TouchableOpacity, 
    ImageBackground,
    Keyboard } from 'react-native';
import React, { useState, useContext } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreateAccountForm from '../components/CreateAccountForm';
import ImageUploader from '../components/ImageUploader';
import ScreenWrapper from './ScreenWrapper';
import ThemeModeToggle from '../components/ThemeModeToggle';
import { G } from '../constants/SIZES';
import { ColorSchemeContext } from '../context/ColorSchemeContext';

import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const SignupPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useContext(ColorSchemeContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [filePath, setFilePath] = useState<string | undefined>(undefined)

    const getCleanUpScreen = () => {
        Keyboard.dismiss()
        setName('')
        setEmail('')
        setPassword('')
        setFilePath(undefined)
    }
    // on press Sign Up button will be created new User Account on Firebase
    const createNewUserAccount = async() => {
        // created new User Account
        const newUser = await auth().createUserWithEmailAndPassword(email, password)
        // create unique image name for save on Storage
        let uniqueAvatarName = `user_avatars/${name}_${newUser.user.uid.slice(0,4)}_avatar`
        // put image in Storage and download image URL
        filePath && await storage().ref(uniqueAvatarName).putFile(filePath)
        let imageURL = await storage().ref(uniqueAvatarName).getDownloadURL()

        await newUser.user.updateProfile({ // <--- update user profile with adding name and photo
            displayName: name,
            photoURL: imageURL
        })
        // save User on Storage DB
        await firestore().collection('USERS_DB').doc(newUser.user.uid).set({
            displayName: name,
            email,
            photoURL: imageURL,
            uid: newUser.user.uid,
            phoneNumber: null
        })
        .then(() => getCleanUpScreen())
        .then(() => navigation.navigate("Chats"))
        .catch(error => {
            console.log(`_SIGN_UP_AUTH_ERROR_ --> ${error}`)
        })
    }

    return (
        <TouchableWithoutFeedback onPress={getCleanUpScreen}>
            <ScreenWrapper>
                {/* go back button */}
                <View style={{flex: 1}}>

                    <View style={styles.nav_header}>
                        <TouchableOpacity 
                            style={{flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => navigation.navigate("Welcome")}>
                            <Icon name='chevron-left' color={COLORS.tint} size={34}/>
                            <Text style={{fontSize: 18, color: COLORS.tint}}>Back</Text>
                        </TouchableOpacity>
                        <ThemeModeToggle/>
                    </View>

                    <Text style={[styles.page_title, {color: COLORS.color}]}>Create Account</Text>
                </View>
                {/* form for creating new users ----> */}
                <CreateAccountForm 
                    name={name} setName={setName} 
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                />
                {/* image picker for uploading images on Firebase Storage */}
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 16}}>
                    <ImageUploader setFilePath={setFilePath} color={COLORS.blue} size={34}/>
                    <Text style={{color: COLORS.color}}>Choose user image</Text>
                </View>
                <TouchableOpacity 
                    onPress={createNewUserAccount} 
                    style={[styles.button, {backgroundColor: COLORS.orange}]}>
                    <Text style={[styles.button_text, {color: COLORS.white}]}>Create new Account</Text>
                </TouchableOpacity>
                <View style={styles.text_link}>
                    <Text style={{color: COLORS.tint}}>Have an account?</Text>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', gap: 10}}
                        onPress={() => navigation.navigate("LoginPage")}>
                        <Text style={[styles.button_text, {color: COLORS.tint}]}>Log in</Text>
                        <Icon name='east' size={24} color={COLORS.tint}/>
                    </TouchableOpacity>
                </View>
            </ScreenWrapper>
        </TouchableWithoutFeedback>
    )
}
export default SignupPage_Screen;

const styles = StyleSheet.create({
    page_title: {
        fontSize: 36,
        marginBottom: 50,
    },
    // title: {
    //     fontSize: 46,
    //     fontWeight: '600'
    // },
    nav_header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    button: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 20
    },
    button_text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    }, 
    text_link: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: 40,
        gap: 10
    },

});
