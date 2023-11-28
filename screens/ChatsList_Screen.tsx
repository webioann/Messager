import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import ChatPreview from '../components/ChatPreview';
import BottomSectionWrapper from '../components/BottomSectionWrapper';
import ChatsBottomMenu from '../components/ChatsBottomMenu';
import { DUMMY_CHATS } from '../constants/dummyChatsList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../constants/SIZES';
import { UserContext } from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';

interface IUser {
  displayName: string 
  email: string 
  uid: string 
  photoURL: string 
  phoneNumber: string 
}

const ChatsList_Screen = () => {
  const [value, setValue] = useState('')
  const [contactsList, setContactsList] = useState<IUser[]>([])

  const currentUser = useContext(UserContext)

const fetchAllChattingUsers = async() => {
  const data = await firestore().collection('USERS_DB').get();
  let allRegsterUsers = data.docs.map((doc) => ({...doc.data()}))
  let temp = allRegsterUsers.filter((item) => {
    let roomId = ''
    if(currentUser?.uid) {
      // set CHAT ROOM unique ID
      if( item.uid > currentUser.uid ) {
        roomId = item.uid.slice(0,8).concat('_@_', currentUser.uid.slice(0,8))
      }
      if( currentUser.uid > item.uid ) {
        roomId = currentUser.uid.slice(0,8).concat('_@_', item.uid.slice(0,8))
      }
    } 
    item.uid !== currentUser?.uid
  })
  // setContactsList(temp as IUser[])
}

useEffect(() => {
  fetchAllChattingUsers()
}, [])


  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor={COLORS.BG}/>
      <View style={styles.headerContainer}>
        <UserAvatarImage pathToImage={currentUser?.photoURL ? currentUser.photoURL : ''} size={SIZES.MEDIUM}/>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerAddButton}>
          <MaterialIcons name='add' size={24} color={COLORS.LIGHT}/>
        </View>
      </View>
      <TextInput 
        onChangeText={setValue}
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor={COLORS.LIGHT}
        value={value}/>
      <FlatList 
        data={DUMMY_CHATS}
        renderItem={({item}) => <ChatPreview {...item}/>}
        keyExtractor={item => item.timeStamp}
      />
      <BottomSectionWrapper>
        <ChatsBottomMenu/>
      </BottomSectionWrapper>
    </SafeAreaView>
  )
}
export default ChatsList_Screen;

const styles = StyleSheet.create({
  area: {
    backgroundColor: COLORS.BG,
    flex: 1,
    paddingHorizontal: SIZES.GAP,
    position: 'relative',
    paddingBottom: SIZES.SAFE,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    flex: 1,
    paddingHorizontal: 16,
    color: COLORS.LIGHT,
    fontSize: 26,
    fontWeight: '600'
  },
  headerAddButton: {
    width: SIZES.SMALL,
    height: SIZES.SMALL,
    borderRadius: SIZES.SMALL / 2,
    backgroundColor: COLORS.ACCENT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    backgroundColor: '#272b34',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 8,
  }
});
