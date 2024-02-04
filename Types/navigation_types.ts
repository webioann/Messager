// ===================================
import React from 'react'
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
// import { DrawerNavigationProp } from '@react-navigation/drawer';

export type StackNavigatorParams = {
  Chat: {
    contact: string | null
    contactId: string
    avatar_url: string | null
    room: string
  }
  Messager: undefined
  Settings: undefined
  Welcome: undefined
  LoginPage: undefined
  SignupPage: undefined
  Contacts: undefined
  Profile: undefined
  NotFoundPage: {
    transmittedTitle: string
  }
};

export type UseNavigation_Type = NativeStackNavigationProp<StackNavigatorParams>

export type ScreenOptions_Type = {
  headerStyle: {backgroundColor: string}
  headerTintColor: string
  headerShadowVisible: boolean
  headerShown?: boolean
  title?: string
  headerLeft?: () => React.ReactNode
  headerRight?: () => React.ReactNode
}
export type DrawerItemOptions_Type = {
  drawerLabel?: string | ((props: { focused: boolean; color: string }) => React.ReactNode);
  drawerIcon?: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
  drawerActiveBackgroundColor?: string
  drawerInactiveBackgroundColor?: string
  contentContainerStyle?: StyleProp<ViewStyle>
}