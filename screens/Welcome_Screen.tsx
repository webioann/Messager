import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {  useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from './ScreenWrapper';
import { COLORS, SIZES, G } from '../constants/SIZES';

const Welcome_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const user = useContext(UserContext)

    return (
        <ScreenWrapper>
            {/* TODO:  red circle for user activity highlighting*/}
            <View style={{flex: 1}}>
                <View style={[styles.signal, {backgroundColor:  user ? 'red' : 'blue'}]}></View>
                {/* <View style={[styles.signal, {backgroundColor:  appColorScheme === 'dark' ? 'black' : 'white'}]}></View> */}
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
        </ScreenWrapper>
    )
    
}
export default Welcome_Screen;

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
    signal: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red'
    }
});
