import React from 'react';
import Chats_Screen from './screens/Chats_Screen';
import Chat_Screen from './screens/Chat_Screen';
import Settings_Screen from './screens/Settings_Screen';
import Wellcome_Screen from './screens/Wellcome_Screen';
import LoginPage_Screen from './screens/LoginPage_Screen';
import SignupPage_Screen from './screens/SignupPage_Screen';
import Contacts_Screen from './screens/Contacts_Screen';
import EditContact_Screen from './screens/EditContact_Screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams, ScreenOptions_Type } from './Types/navigation_types';
import { COLORS, SIZES } from './constants/SIZES';
import { USER_CONTEXT_PROVIDER } from './context/UserContext';

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
    <USER_CONTEXT_PROVIDER>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Wellcome'>
          <Stack.Screen 
            name="Wellcome" 
            component={Wellcome_Screen}
            options={ screenOptions } 
          />
          <Stack.Screen 
            name="Chats" 
            component={Chats_Screen}
            options={ screenOptions}
          />
          <Stack.Screen 
            name="Chat" 
            component={Chat_Screen} 
            options={ screenOptions }
          />
          <Stack.Screen 
            name="Settings" 
            component={Settings_Screen}
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
          <Stack.Screen 
            name="Contacts" 
            component={Contacts_Screen}
            options={ screenOptions } 
          />
          <Stack.Screen 
            name="EditContact" 
            component={EditContact_Screen}
            options={ screenOptions } 
          />
        </Stack.Navigator>  
      </NavigationContainer>
    </USER_CONTEXT_PROVIDER>
  )
}
export default App;
