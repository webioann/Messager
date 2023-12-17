import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native'
import Animated, { useSharedValue, withSpring, withTiming, Easing, ReduceMotion, useAnimatedStyle } from 'react-native-reanimated';
import React, { useState, useEffect } from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';
// import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchInput = () => {
    const [value, setValue] = useState('')
    const [unfolded, setUnfolded] = useState(false)
    const { COLORS } = useColorSchemeContext()
    // animation conststants --->
    const searchBarWidth = useSharedValue(0);
    const bgColor = useSharedValue(COLORS.main);

    const onSearchIconClick = () => {
        if(unfolded == true) {
            setUnfolded(false)
            Keyboard.dismiss()
            setValue('')
            searchBarWidth.value = withTiming(searchBarWidth.value - 200);
            bgColor.value = withTiming(COLORS.main)

        }
        if(unfolded == false) {
            setUnfolded(true)
            searchBarWidth.value = withTiming(searchBarWidth.value + 200);
            bgColor.value = withTiming(COLORS.minor)
        }
    }

    return (
        <View style={[styles.searchBody, {flex: 1}]}>
            <Animated.View style={{width: searchBarWidth, backgroundColor: bgColor, borderRadius: 6, height: 40}}>
                <TextInput 
                    onChangeText={setValue}
                    style={[
                        styles.searchInput, 
                        // {backgroundColor: COLORS.main}
                    ]}
                    placeholder='Search'
                    placeholderTextColor={COLORS.color}
                    cursorColor={COLORS.color}
                    onSubmitEditing={Keyboard.dismiss}
                    value={value}
                    autoFocus={true}
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
    searchBody: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 16
    },
    searchInput: {
        borderRadius: 6,
        paddingHorizontal: 10,
        width: '100%',
        height: 40
    },
    hidenSearchInput: {
        display: 'none'
    }
})