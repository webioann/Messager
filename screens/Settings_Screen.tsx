import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import ThemeModeToggle from '../components/ThemeModeToggle';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth'

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    const signoutCurrentUser = () => {
        auth().signOut()
        .then(() => navigation.navigate('Welcome'))
        .catch(error => console.log(`_AUTH_ERROR_ --> ${error}`))
    }

    const defaultFunc = () => {console.log('THIS IS DEFAULT CLICK FUNCTION')}

    return (
        <ScreenWrapper>
            <NavigationHeader title='Settings'>
                <ThemeModeToggle/>
            </NavigationHeader>
            <View>
                {/* Accoun section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Account</Text>
                <View style={[styles.settings, {backgroundColor: COLORS.minor}]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='account-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='shield-account-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Security</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='bell-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon name='lock-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Privacy</Text>
                    </TouchableOpacity>
                </View>
                {/* support section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Support & About</Text>
                <View style={[styles.settings, {backgroundColor: COLORS.minor}]}>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='credit-card-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>My Subscribtion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='help-circle-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Help and Supports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='alert-circle-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Terms and Policies</Text>
                    </TouchableOpacity>
                </View>
                {/* cache section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Cache & cellular</Text>
                <View style={[styles.settings, {backgroundColor: COLORS.minor}]}>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='trash-can-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Free up space</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon name='data-exploration' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Data Server</Text>
                    </TouchableOpacity>
                </View>
                {/* actions section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Actions</Text>
                <View style={[styles.settings, {backgroundColor: COLORS.minor}]}>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='flag-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Report a problem</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={defaultFunc}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='account-multiple-outline' size={24} color={COLORS.color}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Add account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={signoutCurrentUser}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                        <Icon2 name='logout' size={24} color={COLORS.orange}/>
                        <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Log out</Text>
                    </TouchableOpacity>
                </View>
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
    settings: {
        borderRadius: 8,
        padding: 8
    },
    block_title: {
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 6
    }
});
