import { StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import UserAvatarImage from '../components/UserAvatarImage';
import { useUserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { SIZES } from '../constants/SIZES';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import auth from '@react-native-firebase/auth'

// type DrawerItemProps = {
//     label: string;
//     icon_name: string
//     to: 'Chats' | 'Settings' | 'Contacts' | 'Profile'
// }
// type A = React.ComponentProps<typeof DrawerItemList>

// const DrawerContentItemData: DrawerItemProps[] = [
//     {label: 'Chats', icon_name: 'chat-outline', to: 'Chats'},
//     {label: 'Settings', icon_name: 'cog-outline', to: 'Settings'},
//     {label: 'Contacts', icon_name: 'account-outline', to: 'Contacts'},
//     {label: 'Profile', icon_name: 'account-circle', to: 'Profile'},
// ]

const DrawerNavigatorContent = ({...props}) => {
    const { currentUser, restartAuthState } = useUserContext()
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS, toggleColorScheme, appColorScheme } = useColorSchemeContext()

    const signoutCurrentUser = () => {
        auth().signOut()
        .then(() => restartAuthState())
        .then(() => navigation.navigate('Welcome'))
        .catch(error => console.log(`_AUTH_SIGN_OUT_ERROR_ --> ${error}`))
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.drawer_header, {backgroundColor: COLORS.minor, borderBottomColor: COLORS.third}]}>
                <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={70}/>
                <View>
                    <Text style={[styles.user_name, {color: COLORS.color}]}>
                        {currentUser?.displayName ? currentUser.displayName : 'DEFAULT NAME'}
                    </Text>
                    <Text style={[styles.user_email, {color: COLORS.color}]}>
                        {currentUser?.email ? currentUser.email : 'EMAIL'}
                    </Text>
                </View>
            </View>

            <DrawerContentScrollView style={{backgroundColor: COLORS.main}}>
                <DrawerItemList 
                    state={navigation.getParent()}
                    navigation={navigation.getParent()}
                    descriptors={navigation.getParent()}
                    {...props}
                />
                {/* { DrawerContentItemData.map((item) => (
                    <DrawerItem 
                        key={item.to}
                        label={item.label}
                        labelStyle={{fontSize: 16, color: COLORS.color}}
                        icon={({focused}) => <Icon name={item.icon_name} size={34} color={focused ? COLORS.orange : COLORS.tint}/>}
                        onPress={() => navigation.navigate(item.to)}
                    />
                )) } */}
            </DrawerContentScrollView> 
            {/* footer of menu hose to contained theme toggle button (Switch) and Logout user button*/}
            <View style={[styles.drawer_footer, {backgroundColor: COLORS.minor, borderTopColor: COLORS.third}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8, paddingBottom: 30}}>
                    <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Dark theme mode</Text>
                    <Switch 
                        onChange={toggleColorScheme}
                        thumbColor={appColorScheme === 'light' ? COLORS.blue : COLORS.adorn}
                        value={appColorScheme === 'light' ? true : false}
                        trackColor={{true: COLORS.accent, false: COLORS.grey}}
                    />
                </View>
                <TouchableOpacity
                    onPress={signoutCurrentUser}
                    style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
                    <Icon name='logout' size={24} color={COLORS.orange}/>
                    <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DrawerNavigatorContent;

const styles = StyleSheet.create({
    drawer_header: {
        marginTop: -4, // - 4px when use SafeAreaView
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 30,
        paddingHorizontal: SIZES.GAP,
        borderBottomWidth: 1
    },
    user_name: {
        fontSize: 20,
        fontWeight: '600'
    },
    user_email: {
        fontSize: 16
    },
    drawer_footer: {
        justifyContent: 'flex-end',
        padding: 16,
        borderTopWidth: 1
    },

})