import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class HealthCenters extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Health Centers</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
