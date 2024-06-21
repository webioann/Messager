import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native'
import Animated, { useSharedValue,  withTiming, withDelay } from 'react-native-reanimated';
import React, { useState } from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/SIZES';

type searchInputProps = {
    getSearchQuery: React.Dispatch<React.SetStateAction<string | null>>
}

const SearchInput: React.FC<searchInputProps> = ({getSearchQuery}) => {
    const [value, setValue] = useState('')
    const [isActive, setIsActive] = useState(false)
    const { COLORS } = useColorSchemeContext()
    // animation conststants --->
    const searchBarWidth = useSharedValue(0);
    const bgColor = useSharedValue(COLORS.main);
    const maxWidth = 300;

    const onSearchIconClick = () => {
        if(isActive == true) {
            getSearchQuery(value)
            setIsActive(false)
            Keyboard.dismiss()
            searchBarWidth.value = withTiming(searchBarWidth.value - maxWidth);
            bgColor.value = withTiming(COLORS.main)
            setValue('')
        }
        if(isActive == false) {
            setIsActive(true)
            getSearchQuery(null)
            searchBarWidth.value = withTiming(searchBarWidth.value + maxWidth);
            bgColor.value = withTiming(COLORS.minor)
        }
    }

    return (
        <View style={[styles.searchContainer, {flex: 1}]}>
            <Animated.View style={[styles.animeView, {width: searchBarWidth, backgroundColor: bgColor}]}>
                <TextInput 
                    onChangeText={setValue}
                    style={[styles.searchInput, {color: COLORS.color}]}
                    placeholder={isActive ? 'Search' : ''}
                    placeholderTextColor={COLORS.color}
                    cursorColor={COLORS.color}
                    onSubmitEditing={Keyboard.dismiss}
                    value={value}
                />
            </Animated.View>
            <Pressable onPress={onSearchIconClick}>
                <Icon2 name='magnify' size={24} color={COLORS.color}/>
            </Pressable>
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    animeView: {
        borderRadius: 6, 
        height: 35
    },
    searchInput: {
        borderRadius: 6,
        paddingHorizontal: 10,
        width: '100%',
        height: 40,
    },
    hidenSearchInput: {
        display: 'none'
    }
})