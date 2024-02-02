import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type rowWrapperWithLabelType = {
    children: ReactNode[] | ReactNode
    label?: string
    hintLabel?: string
    showHint?: boolean
}

const RowWrapperWithLabel: React.FC<rowWrapperWithLabelType> = ({children, label, hintLabel, showHint}) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
            {label && <Text style={[styles.label, {color: COLORS.adorn}]}>
                { label } 
                {showHint && <Text style={[styles.label, {color: COLORS.adorn}]}>{hintLabel}</Text>}
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