// ===================================
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 

type ScrenParams = {
  name: string
  params: {
    sender: string
    avatar_url: string
  }
  key: string
  path?: string
}

export type RootStackParams = {
  SingleChat: {
    sender: string
    avatar_url: string
    room: string
  }
  Chats: undefined
  Settings: undefined
  Wellcome: undefined
  LoginPage: undefined
  SignupPage: undefined
};

export type UseNavigation_Type = NativeStackNavigationProp<RootStackParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
  title: string
}
