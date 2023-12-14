import { StyleSheet, Text, View, Linking, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import UserAvatarImage from '../components/UserAvatarImage';
import ThemeModeToggle from '../components/ThemeModeToggle';
import { useUserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { SIZES } from '../constants/SIZES';
// import { DrawerContentComponentProps } from '@react-navigation/drawer';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import auth from '@react-native-firebase/auth'

type DrawerItemProps = {
    label: string;
    icon_name: string
    to: 'Chats' | 'Settings' | 'Contacts' | 'Profile'
}
// type A = React.ComponentProps<typeof DrawerItemList>

const DrawerContentItemData: DrawerItemProps[] = [
    {label: 'Chats', icon_name: 'chat-outline', to: 'Chats'},
    {label: 'Settings', icon_name: 'cog-outline', to: 'Settings'},
    {label: 'Contacts', icon_name: 'account-outline', to: 'Contacts'},
    {label: 'Profile', icon_name: 'account-circle', to: 'Profile'},
]

const DrawerNavigatorContent = ({...props }) => {
    const { currentUser, restartAuthState } = useUserContext()
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    const signoutCurrentUser = () => {
        auth().signOut()
        .then(() => restartAuthState())
        .then(() => navigation.navigate('Welcome'))
        .catch(error => console.log(`_AUTH_SIGN_OUT_ERROR_ --> ${error}`))
    }

    return (
        <SafeAreaView style={{flex: 1}}>
                <View style={[styles.drawer_header, {backgroundColor: COLORS.minor}]}>
                    <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={70}/>
                    <View>
                        <Text style={[styles.user_name, {color: COLORS.color}]}>
                            {currentUser?.displayName ? currentUser.displayName : 'DEFAULT NAME'}
                        </Text>
                        <Text style={[styles.user_email, {color: COLORS.color}]}>
                            {currentUser?.email ? currentUser.email : 'DEFAULT NAME'}
                        </Text>
                    </View>
                    <ThemeModeToggle/>
                </View>

            <DrawerContentScrollView style={{backgroundColor: COLORS.main}} {...props}>
                {/* <DrawerItemList {...props} /> */}
                { DrawerContentItemData.map((item) => (
                    <DrawerItem 
                        key={item.to}
                        label={item.label}
                        activeBackgroundColor={'orange'}
                        labelStyle={{fontSize: 16, color: COLORS.color}}
                        icon={({focused}) => <Icon name={item.icon_name} size={34} color={focused ? COLORS.orange : COLORS.tint}/>}
                        onPress={() => navigation.navigate(item.to)}
                    />
                )) }
            </DrawerContentScrollView> 
            <View style={[styles.drawer_footer, {backgroundColor: COLORS.main, borderTopColor: COLORS.orange}]}>
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
        paddingHorizontal: SIZES.GAP
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