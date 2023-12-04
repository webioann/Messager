import { Appearance } from 'react-native'
import React, { useState, useEffect } from 'react'

const useColorScheme = () => {
    const [appColorScheme, setAppColorScheme] = useState<'dark' | 'light'>('light')
    // const diviceColorScheme = Appearance.getColorScheme()
    const [COLORS, setCOLORS] = useState({
        BG_MAIN: 'white',
        BG_TINT: 'grey',
        ACCENT: '#ef4c4c',
        TEXT_MAIN: '#3f3764',
        TEXT_TINT: '#bbb9c8'
    })

    useEffect(() => {
        if(appColorScheme === 'dark') {
            setCOLORS({
                BG_MAIN: '#141627',
                BG_TINT: '#3f3764',
                ACCENT: '#ef4c4c',
                TEXT_MAIN: 'white',
                TEXT_TINT: '#bbb9c8'
            })
        }
        if(appColorScheme === 'light') {
            setCOLORS({
                BG_MAIN: 'white',
                BG_TINT: 'grey',
                ACCENT: '#ef4c4c',
                TEXT_MAIN: '#3f3764',
                TEXT_TINT: '#bbb9c8'
            })
        }
    }, [appColorScheme])

    return { appColorScheme, setAppColorScheme, COLORS }
}

export default useColorScheme;

