import { StyleSheet, View, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Contact from '../components/Contact';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { UserType } from '../Types/users_types';
import firestore from '@react-native-firebase/firestore';

const Contacts_Screen = () => {
    const { currentUser } = useUserContext()
    const { COLORS } = useColorSchemeContext()
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
        <ScreenWrapper>
            {/* <NavigationHeader title='Contacts'/> */}
            <View style={[styles.search, {backgroundColor: COLORS.minor}]}>
                <Icon name='search' size={26} color={COLORS.tint}/>
                <TextInput 
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder='Search'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.color}
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}/>
            </View>
            <FlatList 
                data={contactsList} 
                renderItem={({item}) => <Contact {...item}/>} 
                keyExtractor={item => item.uid}
                style={{paddingVertical: 20}}>
            </FlatList>
        </ScreenWrapper>
    )
}

export default Contacts_Screen;

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    contact_item: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 5
    },
});