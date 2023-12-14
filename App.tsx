import React from 'react';
import Chats_Screen from './screens/Chats_Screen';
import Chat_Screen from './screens/Chat_Screen';
import Settings_Screen from './screens/Settings_Screen';
import Welcome_Screen from './screens/Welcome_Screen';
import LoginPage_Screen from './screens/LoginPage_Screen';
import SignupPage_Screen from './screens/SignupPage_Screen';
import Contacts_Screen from './screens/Contacts_Screen';
import EditContact_Screen from './screens/EditContact_Screen';
import Profile_Screen from './screens/Profile_Screen';
import DrawerNavigatorContent from './screens/DrawerNavigatorContent';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigatorParams, ScreenOptions_Type } from './Types/navigation_types';
import useColorSchemeContext from './hooks/useColorSchemeContext';
import { useUserContext } from './context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';


const App: React.FC = () => {
  const Stack = createNativeStackNavigator<StackNavigatorParams>();
  const Drawer = createDrawerNavigator();

  const { currentUser } = useUserContext()
  const { COLORS } = useColorSchemeContext()


  const StackNavigationOptions: ScreenOptions_Type = {
    headerStyle: {backgroundColor: COLORS.main},
    headerTintColor: COLORS.color,
    headerShadowVisible: false,
    headerShown: false,
    title: ''
  }

  const DrawerNavigator = () => {
    const navigation = useNavigation()

    const drawerScreenOptions: ScreenOptions_Type = {
      headerStyle: {backgroundColor: COLORS.main},
      headerTintColor: COLORS.color,
      headerShadowVisible: false,
      headerShown: true,
      headerLeft: () => {
        return( 
          <View style={{paddingLeft: 16}}>
            <Icon name='menu' color={COLORS.color} size={24} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
          </View>)
      },
    }
    const drawerListItemOptions = {

    }
    return (
      <Drawer.Navigator screenOptions={drawerScreenOptions} drawerContent={props => <DrawerNavigatorContent {...props}/>}>
        <Drawer.Screen name="Chats" component={Chats_Screen} options={{drawerActiveBackgroundColor: 'orange'}}/>
        <Drawer.Screen name="Settings" component={Settings_Screen}/>
        <Drawer.Screen name="Contacts" component={Contacts_Screen}/>
        <Drawer.Screen name="Profile" component={Profile_Screen}/>
      </Drawer.Navigator>  
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'} screenOptions={StackNavigationOptions}>
        <Stack.Screen name="Welcome" component={ currentUser ? DrawerNavigator : Welcome_Screen}/>
        <Stack.Screen name="Chat" component={Chat_Screen}/>
        <Stack.Screen name="LoginPage" component={LoginPage_Screen}/>
        <Stack.Screen name="SignupPage" component={SignupPage_Screen}/>
        <Stack.Screen name="EditContact" component={EditContact_Screen}/>
      </Stack.Navigator>  
    </NavigationContainer>
  )
}
export default App;
