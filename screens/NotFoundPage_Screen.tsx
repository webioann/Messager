import { Text } from 'react-native'
import React from 'react'
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';

const NotFoundPage_Screen = () => {
    return (
        <ScreenWrapper>
            <NavigationHeader type='goBack' screen='NotFoundPage'>
            </NavigationHeader>
            <Text>NotFoundPage_Screen</Text>
        </ScreenWrapper>
    )
}

export default NotFoundPage_Screen;

