import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth from '@react-native-firebase/auth'

type childrenType = {
    children: ReactNode[] | ReactNode 
}
type Mode = 'dark' | 'light'
type ColorsType = {
    main: string
    minor: string
    third: string
    accent: string
    white: string
    black: string
    grey: string
    color: string
    tint: string
    adorn: string
}
type ColorSchemeContextType = {
    appColorScheme: Mode
    COLORS: ColorsType
    toggleColorScheme: () => void
}

export const ColorSchemeContext = createContext<ColorSchemeContextType>({} as ColorSchemeContextType);

export const COLOR_SCHEME_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [appColorScheme, setAppColorScheme] = useState<Mode>('light')
    const [COLORS, setCOLORS] = useState<ColorsType>({
        main: '#fefeff',
        minor: '#f9f9f9',
        third: '#ffffff',
        accent: '#4b46b8',
        white: '#ffffff',
        black: '#111213',
        grey: '#f0f0f0',
        color: '#111213',
        tint: '#f0f0f0',
        adorn: 'gray'
        })

    const toggleColorScheme = () => {
        setAppColorScheme(appColorScheme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        if(appColorScheme === "light") {
            setCOLORS({
                main: '#fefeff',
                minor: '#f9f9f9',
                third: '#ffffff',
                accent: '#4b46b8',
                white: '#ffffff',
                black: '#111213',
                grey: '#f0f0f0',
                color: '#111213',
                tint: '#f0f0f0',
                adorn: 'gray'
                    })
        }
        if(appColorScheme === 'dark') {
            setCOLORS({
                main: '#141627',
                minor: '#202232',
                third: '#282a3a',
                accent: '#4b46b8',
                white: '#ffffff',
                black: '#111213',
                grey: '#f0f0f0',
                color: '#ffffff',
                tint: '#f0f0f0',
                adorn: 'gray'
                    })
        }
    }, [appColorScheme])


    return (
        <ColorSchemeContext.Provider value={{ appColorScheme, toggleColorScheme, COLORS }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};