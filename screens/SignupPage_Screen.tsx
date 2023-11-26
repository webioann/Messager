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
import Button_Signout from '../components/Button_Signout';
import { COLORS, SIZES, G } from '../constants/SIZES';
import auth from '@react-native-firebase/auth'
import { UserContext } from '../context/UserContext';

const SignupPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const USER = useContext(UserContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const getCleanUpScreen = () => {
        Keyboard.dismiss()
        setName('')
        setEmail('')
        setPassword('')
    }

    const createNewUserAccount = async() => {
        if(email.length > 4 || password.length > 4){
            if(USER) {
                Alert.alert('You must Log Out before Sign Up')
            }
            if(USER == null) {
                await auth().createUserWithEmailAndPassword(email, password)
                await auth().currentUser?.updateProfile({
                    displayName: name,
                    photoURL: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=100'
                })
                .then(() => getCleanUpScreen())
                .catch(error => {
                    console.log(`_SIGN_UP_AUTH_ERROR_ --> ${error}`)
                    Alert.alert('ERROR')
                })
            }
        } else return null
    }

    return (
        <TouchableWithoutFeedback onPress={getCleanUpScreen}>
            <ImageBackground 
                source={require('../assets/BG-2.jpg')} 
                resizeMode='cover'
                style={G.auth_container} >
                <StatusBar backgroundColor={COLORS.BG}/>
                {/* go back button */}
                <View style={{flex: 1}}>
                    <View style={G.row}>
                        <TouchableOpacity onPress={() => navigation.navigate("Wellcome")}>
                            <Icon name='chevron-left' color={'#ffffff'} size={44}/>
                        </TouchableOpacity>
                        <Button_Signout/>
                    </View>
                    <Text style={styles.page_title}>Create Account</Text>
                </View>
                {/* form for creating new users ----> */}
                <CreateAccountForm 
                    name={name} setName={setName} 
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                />
                {/* auth buttons box */}
                <TouchableOpacity 
                    onPress={createNewUserAccount} 
                    style={G.auth_buttons}>
                    <Text style={G.auth_btn_text}>Sign up</Text>
                </TouchableOpacity>
                {/* ------- or ------ */}
                <View style={G.row}>
                    <View style={{flex: 1, height: 1, backgroundColor: COLORS.LIGHT}}></View>
                    <Text style={{color: COLORS.LIGHT, paddingHorizontal: 10, fontSize: 20}}>or</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: COLORS.LIGHT}}></View>
                </View>

                <TouchableOpacity 
                    onPress={() => navigation.navigate("LoginPage")} 
                    style={G.auth_buttons}>
                    <Text style={G.auth_btn_text}>Log in</Text>
                </TouchableOpacity>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}
export default SignupPage_Screen;

const styles = StyleSheet.create({
    page_title: {
        color: COLORS.ACCENT,
        fontSize: 36,
        marginBottom: 50,
    },
    alert: {
        color: COLORS.LIGHT,
        lineHeight: 30,
        marginBottom: 16
    },
});
