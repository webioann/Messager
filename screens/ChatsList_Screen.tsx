import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, StatusBar, ScrollView, Image, FlatList } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import ChatPreview from '../components/ChatPreview';
import { main_bg, contrast_bg, large, medium, fav_gap, main_color } from '../constants/global.styles';
import { DUMMY_CHATS } from '../constants/dummyData';

const ChatsList_Screen = () => {
  const [value, setValue] = useState('')
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={main_bg}/>
      <ScrollView>
        <View style={styles.headerContainer}>
          <UserAvatarImage pathToImage='' size={medium}/>
          <Text style={styles.headerTitle}>Chats</Text>
          <Image style={styles.headerAddButton} source={{uri: 'https://picsum.photos/100'}}/>
        </View>
        <TextInput 
          onChangeText={setValue}
          style={styles.searchInput}
          placeholder='Search'
          placeholderTextColor={main_color}
          value={value}/>
        <FlatList 
          data={DUMMY_CHATS}
          renderItem={({item}) => <ChatPreview {...item}/>}
          keyExtractor={item => item.chatId}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatsList_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_bg,
    paddingHorizontal: fav_gap,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    flex: 1,
    paddingHorizontal: 16,
    color: main_color,
    fontSize: 26,
    fontWeight: '600'
  },
  headerAddButton: {
    width: medium,
    height: medium,
    borderRadius: medium / 2,
    overflow: 'hidden',
    backgroundColor: contrast_bg,
  },
  searchInput: {
    backgroundColor: '#272b34',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
  }
});
// pathToImage={item.pathToImage}
// contactName={item.contactName}
// shortMessage={item.shortMessage}
// timeStamp={item.timeStamp}
// messageCount={item.messageCount}
