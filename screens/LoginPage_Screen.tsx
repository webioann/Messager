import { 
    StyleSheet,
    Text, 
    View, 
    TouchableWithoutFeedback,
    Keyboard, 
    StatusBar, 
    Alert, 
    TouchableOpacity, 
    ImageBackground } from 'react-native';
import React, { useState, useContext } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserLoginForms from '../components/UserLoginForms';
import Button_Signout from '../components/Button_Signout';
import { COLORS, SIZES, G } from '../constants/SIZES';
import auth from '@react-native-firebase/auth'
import { UserContext } from '../context/UserContext';

const LoginPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const USER = useContext(UserContext)

    const getCleanUpScreen = () => {
        Keyboard.dismiss()
        setEmail('')
        setPassword('')
    }

    const loginCurrentUser = async() => {
        if(email.length > 4 || password.length > 4){
            if(USER) {
                Alert.alert('You must Log Out before new Login')
            }
            if(USER == null) {
                await auth().signInWithEmailAndPassword(email, password)
                .then(() => Alert.alert('You are LOGGED IN '))
                .then(() => getCleanUpScreen())
                .catch(error => {
                    console.log(`_LOG_IN_AUTH_ERROR_ --> ${error}`)
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
                <View style={{flex: 1}}>
                    <View style={G.row}>
                        <TouchableOpacity onPress={() => navigation.navigate("Wellcome")}>
                            <Icon name='chevron-left' color={'#ffffff'} size={44}/>
                        </TouchableOpacity>
                        <Button_Signout/>
                    </View>
                    <Text style={styles.page_title}>Wellcome Back</Text>
                </View>

                <UserLoginForms 
                    email={email} setEmail={setEmail} 
                    password={password} setPassword={setPassword}
                />
                {/* auth buttons box */}
                <TouchableOpacity 
                    // onPress={() => navigation.navigate("LoginPage")} 
                    onPress={loginCurrentUser} 
                    style={G.auth_buttons}>
                    <Text style={G.auth_btn_text}>Log in</Text>
                </TouchableOpacity>
                {/* ------- or ------ */}
                <View style={[G.row, { paddingVertical: 10 }]}>
                    <View style={{flex: 1, height: 1, backgroundColor: COLORS.LIGHT}}></View>
                    <Text style={{color: COLORS.LIGHT, paddingHorizontal: 10, fontSize: 20}}>or</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: COLORS.LIGHT}}></View>
                </View>

                <TouchableOpacity 
                    onPress={() => navigation.navigate("SignupPage")} 
                    style={G.auth_buttons}>
                    <Text style={G.auth_btn_text}>Sign up</Text>
                </TouchableOpacity>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}
export default LoginPage_Screen;

const styles = StyleSheet.create({
    page_title: {
        color: COLORS.ACCENT,
        fontSize: 36,
    },
    alert: {
        color: COLORS.LIGHT,
        lineHeight: 30,
        marginBottom: 16
    },
});
