import { StyleSheet, View, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Contact from '../components/Contact';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import SearchInput from '../components/SearchInput';
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { UserType } from '../Types/users_types';
import firestore from '@react-native-firebase/firestore';

const Contacts_Screen = () => {
    const { currentUser } = useUserContext()
    const [searchValue, setSearchValue] = useState<string | null>(null)
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
            <NavigationHeader type='drawer' screen='Contacts'>
                <SearchInput getSearchQuery={setSearchValue}/>
            </NavigationHeader>
            <FlatList 
                data={contactsList} 
                renderItem={({item}) => <Contact {...item}/>} 
                keyExtractor={item => item.uid}
                style={{padding: 16}}>
            </FlatList>
        </ScreenWrapper>
    )
}

export default Contacts_Screen;

const styles = StyleSheet.create({
});