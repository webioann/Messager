import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Children_Type } from '../Types/main_types';

const BottomSectionWrapper: React.FC<Children_Type> = ({ children }) => {
    return (
        <View style={styles.section}>
            { children }
        </View>
    )
};
export default BottomSectionWrapper;

const styles = StyleSheet.create({
    section: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
});