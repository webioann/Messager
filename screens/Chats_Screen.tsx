import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import ChatPreview from '../components/ChatPreview';
import Menu from '../components/Menu';
import Button_Signout from '../components/Button_Signout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SIZES, G } from '../constants/SIZES';
import { UserContext } from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import { UserType } from '../Types/users_types';
import ScreenWrapper from './ScreenWrapper';
import { ColorSchemeContext } from '../context/ColorSchemeContext';


const Chats_Screen = () => {
  const [value, setValue] = useState('')
  const [contactsList, setContactsList] = useState<UserType[]>([])
  const currentUser = useContext(UserContext)
  const { COLORS, toggleColorScheme, appColorScheme } = useContext(ColorSchemeContext)

  // const navigation = useNavigation<UseNavigation_Type>();

const fetchAllChattingUsers = async() => {
  // const chatsDocs = await firestore().collection('CHAT_ROOM_DB').get();
  // let chats = chatsDocs.docs.map((doc) => doc.id)
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
}, [currentUser])


  return (
    <ScreenWrapper>
      <View style={styles.headerContainer}>
        <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={SIZES.MEDIUM}/>
        <Text style={[styles.headerTitle, {color: COLORS.color}]}>Chats</Text>
        <Button_Signout/>
        <View style={[styles.headerAddButton, {backgroundColor: COLORS.third}]}>
          <Icon name='add' size={24} color={'white'}/>
        </View>
      </View>
      <TextInput 
        onChangeText={setValue}
        style={[styles.searchInput, {backgroundColor: 'rgb(210, 208, 208)'}]}
        placeholder='Search'
        placeholderTextColor={COLORS.color}
        value={value}/>
      <FlatList 
        data={contactsList}
        renderItem={({item}) => <ChatPreview {...item}/>}
        keyExtractor={item => item.uid}
      />
      <Menu/>
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
