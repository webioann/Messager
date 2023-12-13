import { StyleSheet, Text, View, Linking, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import UserAvatarImage from '../components/UserAvatarImage';
import ThemeModeToggle from '../components/ThemeModeToggle';
import { useUserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { StackNavigatorParams } from '../Types/navigation_types';
import useColorSchemeContext from '../hooks/useColorSchemeContext';


type customDrawerContentItem = {
    label: string;
    focused: boolean;
}
type DrawerItemProps = {
    label: string;
    icon_name: string
    to: 'Chats' | 'Settings' | 'Contacts' | 'Profile'
}
type A = React.ComponentProps<typeof DrawerItemList>

const DrawerContentItemData: DrawerItemProps[] = [
    {label: 'Chats', icon_name: 'chat-outline', to: 'Chats'},
    {label: 'Settings', icon_name: 'cog-outline', to: 'Settings'},
    {label: 'Contacts', icon_name: 'account-outline', to: 'Contacts'},
    {label: 'Profile', icon_name: 'account-circle', to: 'Profile'},
]

const DrawerNavigatorContent = () => {
    const { currentUser } = useUserContext()
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    return (
        <SafeAreaView style={{flex: 1}}>
            <DrawerContentScrollView style={{backgroundColor: COLORS.main, flex: 1}}>
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
                { DrawerContentItemData.map((item) => (
                    <DrawerItem 
                        label={item.label}
                        activeBackgroundColor={'orange'}
                        labelStyle={{fontSize: 16, color: COLORS.color}}
                        icon={({focused}) => <Icon name={item.icon_name} size={34} color={focused ? COLORS.orange : COLORS.tint}/>}
                        onPress={() => navigation.navigate(item.to)}
                    />
                )) }
            </DrawerContentScrollView>    
        </SafeAreaView>
    )
}

export default DrawerNavigatorContent;

const styles = StyleSheet.create({
    drawer_header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 30,
        paddingHorizontal: 16
    },
    user_name: {
        fontSize: 20,
        fontWeight: '600'
    },
    user_email: {
        fontSize: 16
    }
})