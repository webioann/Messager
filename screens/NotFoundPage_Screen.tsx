import { Text } from 'react-native';
import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigatorParams } from '../Types/navigation_types';

type routeProps = NativeStackScreenProps<StackNavigatorParams, 'NotFoundPage'>

const NotFoundPage_Screen: React.FC<routeProps> = ({route}) => {
    const {transmittedTitle} = route.params;
    const { COLORS } = useColorSchemeContext()

    return (
        <ScreenWrapper>
            <NavigationHeader type='goBack' screen='NotFoundPage'/>   
            <Text style={{fontSize: 24, color: COLORS.orange, textAlign: 'center', marginTop: 100}}>
                { transmittedTitle }
            </Text>
        </ScreenWrapper>
    )
}

export default NotFoundPage_Screen;

