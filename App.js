import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import First from './src/components/First';

export default class App extends React.Component {
  render() {
    return (
      <First />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
