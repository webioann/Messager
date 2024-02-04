import { StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import WrapperWithLinkAndIcon from '../components/WrapperWithLinkAndIcon';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { useUserContext } from '../context/UserContext';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()
    const { restartAuthState } = useUserContext()

    const signOutWithAlert = () => {
        Alert.alert('WARNING', 'Do you really want logout?', [
            { text: 'YES', onPress : () => {
                auth().signOut()
                .then(() => restartAuthState())
                .then(() => navigation.navigate('Welcome'))
                .catch(error => console.log(`_AUTH_SIGN_OUT_ERROR_ --> ${error}`))
            }},
            { text: 'NOT', onPress : () => {return}, style: 'cancel'},
        ])
    }

    return (
        <ScreenWrapper>
            <NavigationHeader type='drawer' screen='Settings'/>
            <View style={{paddingHorizontal: 26}}>
                {/* Accoun section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Account</Text>
                <View style={styles.section}>
                    <WrapperWithLinkAndIcon 
                        title='Edit profile' 
                        iconName='account-outline' 
                        onPress={() => navigation.navigate('Profile')}/>
                    <WrapperWithLinkAndIcon 
                        title='Security' 
                        iconName='shield-account-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Security Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Notifications' 
                        iconName='bell-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Notification Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Privacy' 
                        iconName='lock-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Privacy Page'})
                        }/>
                </View>
                {/* support section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Support & About</Text>
                <View style={styles.section}>
                    <WrapperWithLinkAndIcon 
                        title='My Subscribtion' 
                        iconName='credit-card-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Subscription Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Help and Supports' 
                        iconName='help-circle-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Support Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Terms and Policies' 
                        iconName='police-badge-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Terms Page'})
                        }/>
                </View>
                {/* cache section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Cache & cellular</Text>
                <View style={styles.section}>
                    <WrapperWithLinkAndIcon 
                        title='Free up space' 
                        iconName='trash-can-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Free up space Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Data Server' 
                        iconName='database-arrow-up-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Server Data Page'})
                        }/>
                </View>
                {/* actions section */}
                <Text style={[styles.block_title, {color: COLORS.color}]}>Actions</Text>
                <View style={styles.section}>
                    <WrapperWithLinkAndIcon 
                        title='Report a problem' 
                        iconName='flag-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Report a problem Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Add account' 
                        iconName='account-multiple-outline' 
                        onPress={() => 
                            navigation.navigate('NotFoundPage', 
                            {transmittedTitle: 'This is Add account Page'})
                        }/>
                    <WrapperWithLinkAndIcon 
                        title='Log out' 
                        iconName='logout' 
                        color={COLORS.orange}
                        onPress={ signOutWithAlert }/>
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
    section: {
        padding: 8
    },
    block_title: {
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 6,
        paddingHorizontal: 16
    }
});
