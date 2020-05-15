import React from 'react';
import {Text, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

export default function Start({navigation}) {
//   console.warn('start');

  const checkUserData = async () => {
    // console.warn('function was called');
    // const user = await AsyncStorage.getItem('user');
    // if (user != null) {
    //   navigation.push('HomeTab');
    // } else {
    //   navigation.push('Login');
    // }
    navigation.push('HomeTab');
  };
  return (
    <View style={{flex: 1}}>
      <NavigationEvents
        onWillFocus={() => {
          checkUserData();
          // Do your things here
        }}
      />
    </View>
  );
}
