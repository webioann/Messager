import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type rowWrapperWithLabelType = {
    children: ReactNode[] | ReactNode
    label?: string
}

const RowWrapperWithLabel: React.FC<rowWrapperWithLabelType> = ({children, label}) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
            {label && <Text style={[styles.label, {color: COLORS.adorn}]}>
                { label }
            </Text>}
            { children }
        </View>
    )
}

export default RowWrapperWithLabel

const styles = StyleSheet.create({
    field: {
        borderBottomWidth: 1,
        marginVertical: 8
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
})