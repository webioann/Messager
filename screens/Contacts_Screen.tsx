import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, G } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserAvatarImage from '../components/UserAvatarImage';
import Contact from '../components/Contact';
import { UserContext } from '../context/UserContext';
import { UserType } from '../Types/users_types';
import firestore from '@react-native-firebase/firestore';

const Contacts_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const currentUser = useContext(UserContext)
    // TODO:
    const defaultAvatar= 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=100'

    const [searchValue, setSearchValue] = useState('')
    const [contactsList, setContactsList] = useState<UserType[]>([])

    const fetchAllContacts = async() => {
        const contacts = await firestore().collection('USERS_DB').get();
        let raw = contacts.docs.map((doc) => ({...doc.data()}))
        let temp = raw.filter(item => item.uid !== currentUser?.uid)
        setContactsList(temp as UserType[])
    }

    useEffect(() => {
        fetchAllContacts()
    }, [])

    return (
        <SafeAreaView style={G.container}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <Text style={{color: COLORS.LIGHT, fontSize: 24, paddingLeft: 40, paddingBottom: 20}}>Contacts</Text>
            <View style={styles.search}>
            <Icon name='search' size={26} color={COLORS.GREY}/>
                <TextInput 
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder='Search'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}/>
            </View>
            <FlatList 
                data={contactsList} 
                renderItem={({item}) => <Contact {...item}/>} 
                keyExtractor={item => item.uid}
                style={{paddingVertical: 20}}>
                <View style={styles.contact_item}>
                    <UserAvatarImage pathToImage={defaultAvatar} size={50}/>
                    <View>
                        <Text style={{color: COLORS.LIGHT}}>CONTACT 1</Text>
                        <Text style={{color: COLORS.LIGHT, fontSize: 13}}>+38 (096) 345-45-45</Text>
                    </View>
                </View>
                <View style={styles.contact_item}>
                    <UserAvatarImage pathToImage={defaultAvatar} size={50}/>
                    <View>
                        <Text style={{color: COLORS.LIGHT}}>CONTACT 2</Text>
                        <Text style={{color: COLORS.LIGHT, fontSize: 13}}>+38 (066) 105-66-14</Text>
                    </View>
                </View>

            </FlatList>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Chats")} 
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name='chevron-left' size={44} color={COLORS.LIGHT}/>
                <Text style={{color: COLORS.LIGHT, fontSize: 30}}>Back</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Contacts_Screen;

{/* <View style={G.row}>
<UserAvatarImage pathToImage={defaultAvatar} size={60}/>
<Text style={{color: COLORS.LIGHT, fontSize: 24}}>Contacts</Text>
<View style={styles.edit}>
    <Icon name='edit' size={24} color={COLORS.LIGHT}/>
</View>
</View> */}


const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: COLORS.DARK,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    contact_item: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 5
    },
    // edit: {
    //     width: SIZES.BIG,
    //     height: SIZES.BIG,
    //     borderRadius: SIZES.BIG / 2,
    //     borderColor: COLORS.ACCENT,
    //     borderStyle: 'solid',
    //     borderWidth: 1


    // }
})