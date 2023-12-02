// ===================================
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { UserType } from './users_types';

export type RootStackParams = {
  Chat: {
    contact: string
    contactId: string
    avatar_url: string
    room: string
  }
  Chats: undefined
  Settings: undefined
  Welcome: undefined
  LoginPage: undefined
  SignupPage: undefined
  Contacts: undefined
  EditContact: { contact: UserType }
};

export type UseNavigation_Type = NativeStackNavigationProp<RootStackParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
  title: string
}
// export interface IUser {
//   displayName: string | null
//   email: string | null
//   uid: string | null
//   photoURL: string | null
//   phoneNumber: string | null
// }

// export type Contact_Type = {
//   displayName: string 
//   email: string 
//   uid: string 
//   photoURL: string 
//   phoneNumber: string 
// }
