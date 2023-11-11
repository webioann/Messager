// ===================================
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 

export type RootStackParams = {
  Wellcome;
  Chats;
  Settings;
};

export type UseNavigation_Type = NativeStackNavigationProp<RootStackParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
}
