import React from 'react';
// import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import ChatsList_Screen from './screens/ChatsList_Screen';
import SingleChat_Screen from './screens/SingleChat_Screen';
import Settings_Screen from './screens/Settings_Screen';
import Wellcome_Screen from './screens/Wellcome_Screen';
import LoginPage_Screen from './screens/LoginPage_Screen';
import SignupPage_Screen from './screens/SignupPage_Screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams, ScreenOptions_Type } from './Types/navigation_types';
import { COLORS, SIZES } from './constants/SIZES';

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  const screenOptions: ScreenOptions_Type = {
    headerStyle: {backgroundColor: COLORS.BG},
    headerTintColor: COLORS.LIGHT,
    headerShadowVisible: false,
    headerShown: false,
    title: ''
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Chats'>
        <Stack.Screen 
          name="Chats" 
          component={ChatsList_Screen}
          options={ screenOptions}
        />
        <Stack.Screen 
          name="SingleChat" 
          component={SingleChat_Screen} 
          options={ screenOptions }
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings_Screen}
          options={ screenOptions } 
        />
        <Stack.Screen 
          name="Wellcome" 
          component={Wellcome_Screen}
          options={ screenOptions } 
        />
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage_Screen}
          options={ screenOptions } 
        />
        <Stack.Screen 
          name="SignupPage" 
          component={SignupPage_Screen}
          options={ screenOptions } 
        />


      </Stack.Navigator>  
    </NavigationContainer>
  )
}
export default App;
