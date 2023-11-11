import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { main_bg, contrast_bg, large, kingsize, fav_gap, main_color } from '../constants/global.styles';

const ChatsBottomMenu = () => {
    return (
        <View style={styles.menu}>
            <View style={styles.link}>
                <Text style={{color: main_color, fontSize: 30}}>O</Text>
            </View>
            <View style={styles.link}>
                <Text style={{color: main_color, fontSize: 30}}>O</Text>
            </View>
            <View style={styles.link}>
                <Text style={{color: main_color, fontSize: 30}}>O</Text>
            </View>
            <View style={styles.link}>
                <Text style={{color: main_color, fontSize: 30}}>O</Text>
            </View>

        </View>
    )
};

export default ChatsBottomMenu;

const styles = StyleSheet.create({
    menu:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: kingsize,
        backgroundColor: 'grey',
        borderRadius: kingsize / 2,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    link: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderColor: '#000000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});