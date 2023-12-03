import { Appearance } from 'react-native'
import React, { useState, useEffect } from 'react'

const useColorScheme = () => {
    const [appColorScheme, setAppColorScheme] = useState<'dark' | 'light'>('light')
    const diviceColorScheme = Appearance.getColorScheme()
    console.log(diviceColorScheme)

    useEffect(() => {
        
    }, [])

    return { appColorScheme, setAppColorScheme }
}

export default useColorScheme;

