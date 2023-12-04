import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import ScreenWrapper from './ScreenWrapper';
import { ColorSchemeContext } from '../context/ColorSchemeContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS, toggleColorScheme, appColorScheme } = useContext(ColorSchemeContext)
    return (
        <ScreenWrapper>
            <View style={[styles.container, {backgroundColor: COLORS.BG_MAIN, paddingHorizontal: SIZES.GAP}]}>
                <Text style={[styles.text, {color: COLORS.TEXT_MAIN}]}>Settings</Text>
                <TouchableOpacity
                    style={[styles.button, styles.elevation, {backgroundColor: COLORS.BG_MAIN}]}
                    onPress={() => navigation.navigate("Chats")}>
                    <Text style={{backgroundColor: COLORS.BG_MAIN, color: COLORS.TEXT_TINT}}>Go to the Chats</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.elevation, {backgroundColor: COLORS.BG_MAIN}]}
                    onPress={() => toggleColorScheme()}>
                    <Icon name={appColorScheme === 'light' ? 'dark-mode' : 'light-mode'} size={24} color={'blue'}/>
                </TouchableOpacity>

                <Text style={{color: COLORS.TEXT_MAIN}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quisquam ducimus necessitatibus sint saepe dolorum minus ab suscipit. Sed velit aspernatur aperiam porro enim quasi voluptatibus cum, suscipit provident vero quibusdam debitis rem illo. Dolorum deleniti quisquam aperiam veniam quidem quasi itaque nemo ratione atque eligendi vitae quam rem temporibus, quis esse. Ratione, perferendis.</Text>
            </View>
        </ScreenWrapper>
    )
    
}
export default Settings_Screen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
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
