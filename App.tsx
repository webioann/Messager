import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.app}>
      <Text>Hello Messenger app World</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
  },
});

export default App;
