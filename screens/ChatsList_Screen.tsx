import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import ChatPreview from '../components/ChatPreview';
import BottomSectionWrapper from '../components/BottomSectionWrapper';
import ChatsBottomMenu from '../components/ChatsBottomMenu';
import { DUMMY_CHATS } from '../constants/dummyChatsList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, sizes } from '../constants/sizes';

const ChatsList_Screen = () => {
  const [value, setValue] = useState('')

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor={colors.BG}/>
      <View style={styles.headerContainer}>
        <UserAvatarImage pathToImage='' size={sizes.MEDIUM}/>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerAddButton}>
          <MaterialIcons name='add' size={24} color={colors.LIGHT}/>
        </View>
      </View>
      <TextInput 
        onChangeText={setValue}
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor={colors.LIGHT}
        value={value}/>
      <FlatList 
        data={DUMMY_CHATS}
        renderItem={({item}) => <ChatPreview {...item}/>}
        keyExtractor={item => item.room}
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
    backgroundColor: colors.BG,
    flex: 1,
    paddingHorizontal: sizes.GAP,
    position: 'relative',
    paddingBottom: sizes.SAFE,
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
    color: colors.LIGHT,
    fontSize: 26,
    fontWeight: '600'
  },
  headerAddButton: {
    width: sizes.SMALL,
    height: sizes.SMALL,
    borderRadius: sizes.SMALL / 2,
    backgroundColor: colors.ACCENT,
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
