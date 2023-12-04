import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth from '@react-native-firebase/auth'

type childrenType = {
    children: ReactNode[] | ReactNode 
}
type Mode = 'dark' | 'light'
type ColorsType = {
    BG_MAIN: string
    BG_TINT: string
    ACCENT: string
    TEXT_MAIN: string
    TEXT_TINT: string
}
type ColorSchemeContextType = {
    appColorScheme: Mode
    COLORS: ColorsType
    toggleColorScheme: () => void
}

export const ColorSchemeContext = createContext<ColorSchemeContextType>({} as ColorSchemeContextType);

export const COLOR_SCHEME_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [appColorScheme, setAppColorScheme] = useState<'dark' | 'light'>('light')
    const [COLORS, setCOLORS] = useState<ColorsType>({
        BG_MAIN: 'white',
        BG_TINT: 'grey',
        ACCENT: '#ef4c4c',
        TEXT_MAIN: '#3f3764',
        TEXT_TINT: '#bbb9c8'
    })

    const toggleColorScheme = () => {
        setAppColorScheme(appColorScheme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        if(appColorScheme === "light") {
            setCOLORS({
                BG_MAIN: 'white',
                BG_TINT: 'grey',
                ACCENT: '#ef4c4c',
                TEXT_MAIN: '#3f3764',
                TEXT_TINT: '#bbb9c8'
            })
        }
        if(appColorScheme === 'dark') {
            setCOLORS({
                BG_MAIN: '#141627',
                BG_TINT: '#3f3764',
                ACCENT: '#ef4c4c',
                TEXT_MAIN: 'white',
                TEXT_TINT: '#bbb9c8'
            })
        }
    }, [appColorScheme])


    return (
        <ColorSchemeContext.Provider value={{ appColorScheme, toggleColorScheme, COLORS }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};