import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { g_styles } from '../global.styles';

const HomePageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#343740'}/>
      <ScrollView>
        
      </ScrollView>
      <Text style={styles.text}>Hello World</Text>
    </SafeAreaView>
  )
}

export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g_styles.app_bg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: g_styles.contrast_bg,
    fontSize: 30,
  }
});
