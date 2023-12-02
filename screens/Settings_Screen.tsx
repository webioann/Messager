import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, Button, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/SIZES';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <View>
                <Text style={styles.text}>Settings</Text>
                <TouchableOpacity
                    style={[styles.button, styles.elevation]}
                    onPress={() => navigation.navigate("Chats")}>
                    <Text style={{backgroundColor: 'white', color: '#bbb9c8'}}>Go to the Chats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
}
export default Settings_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        // color: COLORS.ACCENT,
        color: '#3f3764',
        fontSize: 50,
        marginBottom: 50,
        fontWeight: '600',
        letterSpacing: 5
    },
    button: {
        padding: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 5,
        shadowColor: '#171717',
    },
});
