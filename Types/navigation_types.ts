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
  Contacts: undefined
  ContactEdit: {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
  }
};

export type UseNavigation_Type = NativeStackNavigationProp<RootStackParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
  title: string
}
export interface IUser {
  displayName: string | null
  email: string | null
  uid: string | null
  photoURL: string | null
  phoneNumber: string | null
}
