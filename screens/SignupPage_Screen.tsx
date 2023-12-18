import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Keyboard } from 'react-native';
import React, { useState } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SignupScreen_Form from '../components/SignupScreen_Form';
import UploadImageInStorage from '../components/UploadImageInStorage';
import ScreenWrapper from './ScreenWrapper';
import ThemeModeToggle from '../components/ThemeModeToggle';
import NavigationHeader from '../components/NavigationHeader';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import auth from '@react-native-firebase/auth'
import { useUserContext } from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
// import { nameRegExpPattern, emailRegExpPattern, passwordRegExpPattern } from '../constants/SIZES';

const SignupPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()
    const { restartAuthState } = useUserContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [filePath, setFilePath] = useState<string | undefined>(undefined)
    // const [validationResult, setValidationResult] = useState(false)

    const getCleanUpScreen = () => {
        Keyboard.dismiss()
        setName('')
        setEmail('')
        setPassword('')
        setFilePath(undefined)
    }

    const createNewUserAccount = async() => {
        const newUser = await auth().createUserWithEmailAndPassword(email, password)
        await newUser.user.updateProfile({ // <--- update user profile with adding name and photo
            displayName: name,
            photoURL: filePath
        })
        await firestore().collection('USERS_DB').doc(newUser.user.uid).set({// <--- save User on Storage DB
            displayName: name,
            email,
            photoURL: filePath,
            uid: newUser.user.uid,
            phoneNumber: null
        })
        .then(() => restartAuthState())
        .then(() => getCleanUpScreen())
        .then(() => navigation.navigate("Chats"))
        .catch(error => {
            console.log(`_SIGN_UP_AUTH_ERROR_ --> ${error}`)
        })
    }

    return (
        <TouchableWithoutFeedback onPress={getCleanUpScreen}>
            <ScreenWrapper>
                <View style={{flex: 1}}>
                    <NavigationHeader type='goBack' screen='Welcome'>
                        <ThemeModeToggle/>
                    </NavigationHeader>
                </View>
                {/* form for creating new users ----> */}
                <SignupScreen_Form 
                    name={name} setName={setName} 
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                />
                {/* image picker for uploading images on Firebase Storage */}
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 16}}>
                    <UploadImageInStorage getImageURL={setFilePath} storageFolder='avatars'>
                        <Icon2 name='camera' size={20} color={COLORS.blue}/>
                    </UploadImageInStorage>
                    <Text style={{color: COLORS.color}}>Choose user image</Text>
                </View>
                <TouchableOpacity 
                    onPress={createNewUserAccount} 
                    // onPress={() => console.log(validationResult, name, email, password, filePath)} 
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
