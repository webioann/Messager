import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputForms from '../components/InputForms';
import { colors, sizes, G } from '../constants/sizes';

const LoginPage_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <ImageBackground 
            source={require('../assets/BG-2.jpg')} 
            resizeMode='cover'
            style={G.auth_container} >
            <StatusBar backgroundColor={colors.BG}/>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigation.navigate("Wellcome")}>
                    <Icon name='chevron-left' color={'#ffffff'} size={44}/>
                </TouchableOpacity>
                <Text style={styles.page_title}>Wellcome Back</Text>
            </View>
            <InputForms/>
            {/* auth buttons box */}
            <TouchableOpacity 
                onPress={() => navigation.navigate("LoginPage")} 
                style={G.auth_buttons}>
                <Text style={G.auth_btn_text}>Log in</Text>
            </TouchableOpacity>
            {/* ------- or ------ */}
            <View style={[G.row, { paddingVertical: 10 }]}>
                <View style={{flex: 1, height: 1, backgroundColor: colors.LIGHT}}></View>
                <Text style={{color: colors.LIGHT, paddingHorizontal: 10, fontSize: 20}}>or</Text>
                <View style={{flex: 1, height: 1, backgroundColor: colors.LIGHT}}></View>
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
        color: colors.ACCENT,
        fontSize: 36,
    },
    alert: {
        color: colors.LIGHT,
        lineHeight: 30,
        marginBottom: 16
    },
});
