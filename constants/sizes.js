export const SIZES = {
    GAP: 16,
    BIGGEST: 70,
    LARGE: 60,
    BIG: 50,
    MEDIUM: 40,
    SMALL: 30,
    SAFE: 80,
};
export const COLORS = {
    BG: '#1b1e25',
    ACCENT: '#ef4c4c',
    DARK: '#22272d',
    LIGHT: '#ffffff',
    GREY: 'grey',
    BLUE: '#1a73e8',
    YELLOW: '#F2CB66',
    BG2: '#1F262E',
    BORDER: '#30373F',
};

import { StyleSheet } from 'react-native';

export const G = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG,
        paddingHorizontal: SIZES.GAP,
        paddingTop:10
    },
    auth_buttons: {
        backgroundColor: COLORS.DARK,
        borderRadius: 8,
    },
    auth_btn_text: {
        color: COLORS.LIGHT,
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
    },
    auth_container: {
        flex: 1,
        backgroundColor: COLORS.BG,
        padding: SIZES.GAP,
        paddingBottom: SIZES.GAP * 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

