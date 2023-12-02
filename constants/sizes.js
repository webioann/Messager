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
export const newCOLORS = {
    GREY: '#bbb9c8',
    DARK: '#3f3764',
    BG: '#141627'
}
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
    fixedOnBottom: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },


})


{/* <LinearGradient 
    start={{x: 0, y: 0}} 
    end={{x: 1, y: 1}}
    locations={[0.5, 1]}
    COLORS={['#373b44','#1a1d24']}
    >
    <View>
        <Text style={styles.text}>Settings</Text>
    </View>
    <Button
        title='Go to the Chats'
        onPress={() => navigation.navigate("Chats")}
    />

</LinearGradient > */}

