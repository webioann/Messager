import { 
    StyleSheet,
    Text, 
    View, 
    TouchableWithoutFeedback,
    Keyboard, 
    TouchableOpacity, 
    } from 'react-native';
import React, { useState } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen_Form from '../components/LoginScreen_Form';
import ScreenWrapper from './ScreenWrapper';
import ThemeModeToggle from '../components/ThemeModeToggle';
import NavigationHeader from '../components/NavigationHeader';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import auth from '@react-native-firebase/auth'
import { useUserContext } from '../context/UserContext';

const LoginPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { restartAuthState } = useUserContext()

    const getCleanUpScreen = () => {
        Keyboard.dismiss()
        setEmail('')
        setPassword('')
    }

    const loginCurrentUser = async() => {
        if(email.length > 4 && password.length > 4){
            await auth().signInWithEmailAndPassword(email, password)
            .then(() => restartAuthState())
            .then(() => getCleanUpScreen())
            .then(() => navigation.navigate("Chats"))
            .catch(error => {
                console.log(`_LOG_IN_AUTH_ERROR_ --> ${error}`)
            })
        } else return null
    }

    return (
        <TouchableWithoutFeedback onPress={getCleanUpScreen}>
            <ScreenWrapper>
                <View style={{flex: 1}}>
                    <NavigationHeader title='Log in'>
                        <ThemeModeToggle/>
                    </NavigationHeader>
                </View>
                <LoginScreen_Form 
                    email={email} setEmail={setEmail} 
                    password={password} setPassword={setPassword}
                />
                <TouchableOpacity 
                    onPress={loginCurrentUser} 
                    style={[styles.button, {backgroundColor: COLORS.orange}]}>
                    <Text style={[styles.button_text, {color: COLORS.white}]}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.text_link}>
                    <Text style={{color: COLORS.tint}}>Have an account?</Text>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', gap: 10}}
                        onPress={() => navigation.navigate("SignupPage")}>
                        <Text style={[styles.button_text, {color: COLORS.tint}]}>Sign up</Text>
                        <Icon name='east' size={24} color={COLORS.tint}/>
                    </TouchableOpacity>
                </View>
            </ScreenWrapper>
        </TouchableWithoutFeedback>
    )
}
export default LoginPage_Screen;

const styles = StyleSheet.create({
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
