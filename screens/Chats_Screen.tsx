import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import ChatPreview from '../components/ChatPreview';
import Menu from '../components/Menu';
import { DUMMY_CHATS } from '../constants/dummyChatsList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, G } from '../constants/SIZES';
import { UserContext } from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import { UserType } from '../Types/users_types';

const Chats_Screen = () => {
  const [value, setValue] = useState('')
  const [contactsList, setContactsList] = useState<UserType[]>([])

  const currentUser = useContext(UserContext)

// const fetchAllChattingUsers = async() => {
//   const chats = await firestore().collection('CHAT_ROOM_DB').get();
//   let IDS = chats.docs.map((doc) => doc.id)
//   const data = await firestore().collection('USERS_DB').get();
//   let allRegsterUsers = data.docs.map((doc) => ({...doc.data()}))
//   let temp = allRegsterUsers.filter((item) => {
//     let roomId = ''
//     if(currentUser?.uid) {
//       // set CHAT ROOM unique ID
//       if( item.uid > currentUser.uid ) {
//         roomId = item.uid.slice(0,8).concat('_@_', currentUser.uid.slice(0,8))
//       }
//       if( currentUser.uid > item.uid ) {
//         roomId = currentUser.uid.slice(0,8).concat('_@_', item.uid.slice(0,8))
//       }
//     }
//     let ss = IDS.filter(i => i === roomId)
//     return ss
//   })
//   console.log(temp)
//   // setContactsList(temp as IUser[])
// }

// useEffect(() => {
//   fetchAllChattingUsers()
// }, [currentUser])


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
      <Menu/>
    </SafeAreaView>
  )
}
export default Chats_Screen;

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
  },
});
