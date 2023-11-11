// ===================================
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 

export type RootStackParams = {
  SingleChat: undefined
  Chats: undefined
  Settings: undefined
};

export type UseNavigation_Type = NativeStackNavigationProp<RootStackParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
}
