import { Text } from 'react-native';
import React from 'react';
import Messager_Screen from './screens/Messager_Screen';
import Chat_Screen from './screens/Chat_Screen';
import Settings_Screen from './screens/Settings_Screen';
import Welcome_Screen from './screens/Welcome_Screen';
import LoginPage_Screen from './screens/LoginPage_Screen';
import SignupPage_Screen from './screens/SignupPage_Screen';
import Contacts_Screen from './screens/Contacts_Screen';
import Profile_Screen from './screens/Profile_Screen';
import NotFoundPage_Screen from './screens/NotFoundPage_Screen';
import DrawerNavigatorContent from './screens/DrawerNavigatorContent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigatorParams, ScreenOptions_Type, DrawerItemOptions_Type } from './Types/navigation_types';
import useColorSchemeContext from './hooks/useColorSchemeContext';
import { useUserContext } from './context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    const drawerScreenOptions: ScreenOptions_Type = {
      headerStyle: {backgroundColor: COLORS.main},
      headerTintColor: COLORS.color,
      headerShadowVisible: false,
      headerShown: false,
    }
    // COMPONENTS OF DRAWER MENU LIST
    const messagerDrawerOptions: DrawerItemOptions_Type = {
      drawerIcon: ({focused, color, size}) => <Icon name='chat-outline' color={focused ? COLORS.accent : COLORS.color} size={24}/>,
      drawerLabel: ({focused, color}) => <Text style={{color: focused ? COLORS.accent : COLORS.color, fontSize: 20}}>Messager</Text>,
      drawerActiveBackgroundColor: COLORS.third,
      drawerInactiveBackgroundColor: COLORS.main,
    }
    const settingsDrawerOptions: DrawerItemOptions_Type = {
      drawerIcon: ({focused, color, size}) => <Icon name='cog-outline' color={focused ? COLORS.accent : COLORS.color} size={24}/>,
      drawerLabel: ({focused, color}) => <Text style={{color: focused ? COLORS.accent : COLORS.color, fontSize: 20}}>Settings</Text>,
      drawerActiveBackgroundColor: COLORS.third,
      drawerInactiveBackgroundColor: COLORS.main,
    }
    const contactsDrawerOptions: DrawerItemOptions_Type = {
      drawerIcon: ({focused, color, size}) => <Icon name='account-outline' color={focused ? COLORS.accent : COLORS.color} size={24}/>,
      drawerLabel: ({focused, color}) => <Text style={{color: focused ? COLORS.accent : COLORS.color, fontSize: 20}}>Contacts</Text>,
      drawerActiveBackgroundColor: COLORS.third,
      drawerInactiveBackgroundColor: COLORS.main,
    }
    const profileDrawerOptions: DrawerItemOptions_Type = {
      drawerIcon: ({focused, color, size}) => <Icon name='account-circle' color={focused ? COLORS.accent : COLORS.color} size={24}/>,
      drawerLabel: ({focused, color}) => <Text style={{color: focused ? COLORS.accent : COLORS.color, fontSize: 20}}>Profile</Text>,
      drawerActiveBackgroundColor: COLORS.third,
      drawerInactiveBackgroundColor: COLORS.main,
    }
    // DRAW NAVIGATOR ====
    return (
      <Drawer.Navigator screenOptions={drawerScreenOptions} initialRouteName='Messager' drawerContent={props => <DrawerNavigatorContent {...props}/>}>
        <Drawer.Screen name="Messager" component={Messager_Screen} options={messagerDrawerOptions}/>
        <Drawer.Screen name="Settings" component={Settings_Screen} options={settingsDrawerOptions}/>
        <Drawer.Screen name="Contacts" component={Contacts_Screen} options={contactsDrawerOptions}/>
        <Drawer.Screen name="Profile" component={Profile_Screen} options={profileDrawerOptions}/>
      </Drawer.Navigator>  
    )
  }
  // STACK NAVIGATOR ====
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'} screenOptions={StackNavigationOptions}>
        <Stack.Screen name="Welcome" component={ currentUser ? DrawerNavigator : Welcome_Screen}/>
        <Stack.Screen name="Messager" component={DrawerNavigator}/>
        <Stack.Screen name="Chat" component={Chat_Screen}/>
        <Stack.Screen name="LoginPage" component={LoginPage_Screen}/>
        <Stack.Screen name="SignupPage" component={SignupPage_Screen}/>
        <Stack.Screen name="NotFoundPage" component={NotFoundPage_Screen}/>
      </Stack.Navigator>  
    </NavigationContainer>
  )
}

export default App;
