// ===================================
import React from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { UserType } from './users_types';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type StackNavigatorParams = {
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
  Profile: undefined
};

export type UseNavigation_Type = NativeStackNavigationProp<StackNavigatorParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
  title?: string
  headerLeft?: () => React.ReactNode
}
export type DrawerItemOptions_Type = {
  drawerLabel?: string | ((props: { focused: boolean; color: string }) => React.ReactNode);
  drawerIcon?: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
  drawerActiveBackgroundColor?: string
  drawerInactiveBackgroundColor?: string

}