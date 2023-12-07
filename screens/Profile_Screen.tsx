import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from './ScreenWrapper'
import NavigationHeader from '../components/NavigationHeader'

const Profile_Screen = () => {
    return (
        <ScreenWrapper>
            <NavigationHeader title='My Profile'>
                <Text>Edit</Text>
            </NavigationHeader>
            <Text>ProfileScreen</Text>
        </ScreenWrapper>
    )
}

export default Profile_Screen

const styles = StyleSheet.create({})