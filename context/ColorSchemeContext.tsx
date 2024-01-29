import React, { createContext, useEffect, useState, ReactNode } from "react";

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
    blue: string
    orange: string
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
        main: '#ffffff', //main background color
        minor: '#5a8fbb',//background color
        third: '#f0f0f0',//background color
        accent: '#3a7ff7',
        white: '#ffffff',
        blue: '#37abe1',
        orange: '#ff6a33',
        black: '#111213',
        grey: '#f0f0f0',
        color: 'rgba(0, 0, 0, 0.7)',//main text color
        tint: 'rgba(0, 0, 0, 0.5)',//text color
        adorn: '#b9c2d1'//text color
        })

    const toggleColorScheme = () => {
        setAppColorScheme(appColorScheme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        if(appColorScheme === "light") {
            setCOLORS({
                main: '#ffffff',
                minor: '#5a8fbb',
                third: '#f0f0f0',
                accent: '#3a7ff7',
                white: '#ffffff',
                blue: '#37abe1',
                orange: '#ff6a33',
                black: '#111213',
                grey: '#f0f0f0',
                color: 'rgba(0, 0, 0, 0.7)',
                tint: 'rgba(0, 0, 0, 0.5)',
                adorn: '#b9c2d1'
            })
        }
        if(appColorScheme === 'dark') {
            setCOLORS({
                main: '#1b2831',
                minor: '#232e3c',
                third: '#151d26',
                accent: '#3a7ff7',
                white: '#ffffff',
                blue: '#37abe1',
                orange: '#ff6a33',
                black: '#111213',
                grey: '#f0f0f0',
                color: '#ffffff',
                tint: '#f0f0f0',
                adorn: '#b9c2d1'
            })
        }
    }, [appColorScheme])

    return (
        <ColorSchemeContext.Provider value={{ appColorScheme, toggleColorScheme, COLORS }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};
