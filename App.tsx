import React from 'react';
import ChatsList_Screen from './screens/ChatsList_Screen';
import Wellcome_Screen from './screens/Wellcome_Screen';
import Settings_Screen from './screens/Settings_Screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App: React.FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Wellcome" component={Wellcome_Screen} />
        <Stack.Screen name="Chats" component={ChatsList_Screen} />
        <Stack.Screen name="Settings" component={Settings_Screen} />
      </Stack.Navigator>  
    </NavigationContainer>
  )
}

export default App;
