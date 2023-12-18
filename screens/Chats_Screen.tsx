import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, FlatList } from 'react-native';
import SearchInput from '../components/SearchInput';
import ChatPreview from '../components/ChatPreview';
import NavigationHeader from '../components/NavigationHeader';
import { SIZES } from '../constants/SIZES';
import firestore from '@react-native-firebase/firestore';
import { UserType } from '../Types/users_types';
import ScreenWrapper from './ScreenWrapper';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { useUserContext } from '../context/UserContext';

const Chats_Screen = () => {
  const [searchQuery, setsearchQuery] = useState<string | null>(null)
  const [contactsList, setContactsList] = useState<UserType[]>([])
  const { COLORS } = useColorSchemeContext()
  const { currentUser } = useUserContext()

const fetchAllChattingUsers = async() => {
  const contactsDocs = await firestore().collection('USERS_DB').get();
  let contacts = contactsDocs.docs.map((doc) => ({...doc.data()}))
  let temp = contacts.filter((contact) => { 
    let chatRoomID: string | null = null
    if(currentUser?.uid) {
      if( contact.uid > currentUser.uid ) {
        chatRoomID = contact.uid.slice(0,8).concat('_@_', currentUser.uid.slice(0,8))
      }
      if( currentUser.uid > contact.uid ) {
        chatRoomID = currentUser.uid.slice(0,8).concat('_@_', contact.uid.slice(0,8))
      }
    }
    return chatRoomID
  })
  setContactsList(temp as UserType[])
}

useEffect(() => {
  fetchAllChattingUsers()
}, [])

  return (
    <ScreenWrapper>
      <NavigationHeader type='drawer' screen='Telegram'>
        <SearchInput/>
      </NavigationHeader>
      <FlatList 
        data={contactsList}
        renderItem={({item}) => <ChatPreview {...item}/>}
        keyExtractor={item => item.uid}
      />
    </ScreenWrapper>
  )
}
export default Chats_Screen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 26,
    fontWeight: '600'
  },
  headerAddButton: {
    width: SIZES.SMALL,
    height: SIZES.SMALL,
    borderRadius: SIZES.SMALL / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
});
