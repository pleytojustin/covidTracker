/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import axios from 'axios';
export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [buttonRstDisable, setbuttonRstDisable] = useState(false);
  const pressResetHandler = () => {
    setbuttonRstDisable(true);
    if (email) {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('m', 'yes');

      axios
        .post('https://member.projectprohub.com/resetting/send-email', formData)
        .then(function (response) {
          Alert.alert("Email was Sent!");
          // if (response.data == 'That email is not in our database') {
          //   Alert.alert('Invalid Email');
          //   setbuttonRstDisable(false);
          // } else if ((response.data).includes('We sent you an email with the password reset link.')) {
          //   setbuttonRstDisable(false);
          // }
          setbuttonRstDisable(false);

        })
        .catch(function (error) {
          Alert.alert("Invalid Email.");

          // Alert.alert('That email is not in our database');
          setbuttonRstDisable(false);
        });
    } else {
      Alert.alert('Please Input your Email');
      setbuttonRstDisable(false);
    }
    navigation.navigate('Home');
    navigation.goBack();
    setbuttonRstDisable(true);
    setbuttonRstDisable(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        To reset your password tell us your email address associated with your
        account. We'll email you a link to reset it.
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#000000"
          onChangeText={(val) => setEmail(val)}
        />
      </View>

      <TouchableOpacity
        onPress={pressResetHandler}
        style={styles.resetBtn}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.resetBtn,
          backgroundColor: buttonRstDisable ? '#f6ae32' : '#305da6',
        }}
        disabled={buttonRstDisable}>
        <Text style={styles.resetText} onPress={pressResetHandler}>
          {buttonRstDisable ? 'Sending Email ...' : 'Reset Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#c0c0c0',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  resetBtn: {
    width: Dimensions.get('window').width / 1.2,
    resizeMode: 'contain',
    // backgroundColor: '#305da6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  resetText: {
    color: 'white',
  },
  infoText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
});
