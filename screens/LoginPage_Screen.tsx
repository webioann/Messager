import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserLoginForms from '../components/UserLoginForms';
import Button_Signout from '../components/Button_Signout';
import { COLORS, SIZES, G } from '../constants/SIZES';
import auth from '@react-native-firebase/auth'

const LoginPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginCurrentUser = () => {
        auth().signInWithEmailAndPassword(email, password)
        // .then(() => console.log(auth().currentUser))
        .then(() => Alert.alert('User is created'))
        .catch(error => console.log(error))
    }

    return (
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
                onPress={() => navigation.navigate("LoginPage")} 
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
