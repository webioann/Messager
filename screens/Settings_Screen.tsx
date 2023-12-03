import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import ScreenWrapper from './ScreenWrapper';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/SIZES';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.text}>Settings</Text>
                <TouchableOpacity
                    style={[styles.button, styles.elevation]}
                    onPress={() => navigation.navigate("Chats")}>
                    <Text style={{backgroundColor: 'white', color: '#bbb9c8'}}>Go to the Chats</Text>
                </TouchableOpacity>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quisquam ducimus necessitatibus sint saepe dolorum minus ab suscipit. Sed velit aspernatur aperiam porro enim quasi voluptatibus cum, suscipit provident vero quibusdam debitis rem illo. Dolorum deleniti quisquam aperiam veniam quidem quasi itaque nemo ratione atque eligendi vitae quam rem temporibus, quis esse. Ratione, perferendis.</Text>
            </View>
        </ScreenWrapper>
    )
    
}
export default Settings_Screen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
