import React from 'react';
import ChatsList_Screen from './screens/ChatsList_Screen';
import Wellcome_Screen from './screens/Wellcome_Screen';
import Settings_Screen from './screens/Settings_Screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams, ScreenOptions_Type } from './Types/navigation_types';
import { main_bg, main_color } from './constants/global.styles';

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  const screenOptions: ScreenOptions_Type = {
    headerStyle: {backgroundColor: main_bg},
    headerTintColor: main_color,
    headerShadowVisible: false
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Wellcome'>
        <Stack.Screen 
          name="Wellcome" 
          component={Wellcome_Screen} 
          options={ screenOptions }
        />
        <Stack.Screen 
          name="Chats" 
          component={ChatsList_Screen}
          options={ screenOptions }
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings_Screen}
          options={ screenOptions } 
        />
      </Stack.Navigator>  
    </NavigationContainer>
  )
}

export default App;
