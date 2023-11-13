import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreateAccountForm from '../components/CreateAccountForm';
import { COLORS, SIZES, G } from '../constants/SIZES';
import auth from '@react-native-firebase/auth'

const SignupPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createNewUserAccount = () => {
        auth().createUserWithEmailAndPassword(email, password)
        .then(() => console.log(name))
        .then(() => console.log(auth().currentUser))
        .then(() => Alert.alert('User is created'))
        .catch(error => console.log(error))
    }

    return (
        <ImageBackground 
            source={require('../assets/BG-2.jpg')} 
            resizeMode='cover'
            style={G.auth_container} >
            <StatusBar backgroundColor={COLORS.BG}/>
            {/* go back button */}
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigation.navigate("Wellcome")}>
                    <Icon name='chevron-left' color={'#ffffff'} size={44}/>
                </TouchableOpacity>
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
