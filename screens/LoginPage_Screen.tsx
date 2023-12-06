import { 
    StyleSheet,
    Text, 
    View, 
    TouchableWithoutFeedback,
    Keyboard, 
    TouchableOpacity, 
    } from 'react-native';
import React, { useState, useContext } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserLoginForms from '../components/UserLoginForms';
import ScreenWrapper from './ScreenWrapper';
import ThemeModeToggle from '../components/ThemeModeToggle';
import { ColorSchemeContext } from '../context/ColorSchemeContext';
import auth from '@react-native-firebase/auth'

const LoginPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useContext(ColorSchemeContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const getCleanUpScreen = () => {
        Keyboard.dismiss()
        setEmail('')
        setPassword('')
    }

    const loginCurrentUser = async() => {
        if(email.length > 4 && password.length > 4){
            await auth().signInWithEmailAndPassword(email, password)
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

                    {/* TODO: maybe create separate component*/}
                    <View style={styles.nav_header}>
                        <TouchableOpacity 
                            style={{flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => navigation.goBack()}>
                            <Icon name='chevron-left' color={COLORS.tint} size={34}/>
                            <Text style={{fontSize: 18, color: COLORS.tint}}>Back</Text>
                        </TouchableOpacity>
                        <ThemeModeToggle/>
                    </View>
                    
                    <Text style={{fontSize: 36, color: COLORS.color}}>Wellcome Back</Text>
                </View>
                <UserLoginForms 
                    email={email} setEmail={setEmail} 
                    password={password} setPassword={setPassword}
                />
                <TouchableOpacity 
                    onPress={loginCurrentUser} 
                    style={[styles.button, {backgroundColor: COLORS.orange}]}>
                    <Text style={[styles.button_text, {color: COLORS.white}]}>Login on you Account</Text>
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
