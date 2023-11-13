import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, Button, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, sizes, G } from '../constants/sizes';

const Wellcome_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <ImageBackground 
            source={require('../assets/BG-2.jpg')} 
            resizeMode='cover'
            style={G.auth_container} >
            <StatusBar backgroundColor={colors.BG}/>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
                    <Icon name='chevron-left' color={'#ffffff'} size={44}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.page_title}>Wellcome</Text>

            <Text style={styles.alert}>You can now focus your console experience by customizing your navigation</Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate("LoginPage")} 
                style={G.auth_buttons}>
                <Text style={G.auth_btn_text}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate("SignupPage")} 
                style={[G.auth_buttons, {marginTop: 16}]}>
                <Text style={G.auth_btn_text}>Sign up</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
    
}
export default Wellcome_Screen;

const styles = StyleSheet.create({
    page_title: {
        color: colors.ACCENT,
        fontSize: 36,
        marginBottom: 50,
    },
    alert: {
        color: colors.LIGHT,
        lineHeight: 30,
        marginBottom: 16
    },
});
