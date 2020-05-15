import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, Alert} from 'react-native';
import safePassProLogo from '../assets/images/logo.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

export default function LoginHealthWorker({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLgnDisable, setbuttonLgnDisable] = useState(false);

  const pressLoginHandler = () => {
    // setbuttonLgnDisable(true);
    // if (email && password) {
    //   const formData = new FormData();
    //   formData.append('email', email);
    //   formData.append('password', password);

    //   axios
    //     .post('https://member.projectprohub.com/mobile/verify', formData)
    //     .then(function (response) {
    //       if (
    //         response.data.status == 'missing' ||
    //         response.data.status == 'invalid'
    //       ) {
    //         Alert.alert('Invalid Email or Password');
    //         setbuttonLgnDisable(false);
    //       } else if (response.data.status == 'success') {
    //         AsyncStorage.setItem('user', JSON.stringify(response.data)).then(
    //           function () {
    //             // console.warn(user);

    //             setbuttonLgnDisable(false);
    //             // console.warn("pushed Home - pressLoginHandler()");
    //             // navigation.push('Home');
    //             navigation.push('HomeTab');
    //           },
    //         );
    //       }
    //     })
    //     .catch(function () {
    //       Alert.alert('Please check your network connection...');
    //       setbuttonLgnDisable(false);
    //     });
    // } else {
    //   Alert.alert('Please Input Username and Password');
    //   setbuttonLgnDisable(false);
    // }


    //just for now
    navigation.push('HomeTab');

  };
  const pressForgotPasswordHandler = () => {
    navigation.push('ForgotPassword');
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={safePassProLogo} />
      <Text style={{marginBottom: 30, fontSize: 20, color: 'blue'}}> Health Worker Login </Text>
      <View style={styles.inputView}>
        <TextInput
          autoCompleteType="email"
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={(val) => setEmail(val)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      {/* <TouchableOpacity onPress={pressForgotPasswordHandler}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={pressLoginHandler}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.loginBtn,
          backgroundColor: buttonLgnDisable ? '#f6ae32' : '#305da6',
        }}
        disabled={buttonLgnDisable}>
        <Text style={styles.loginText} onPress={pressLoginHandler}>
          {buttonLgnDisable ? 'Logging in..' : 'Login'}
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
  logo: {
    // height: Dimensions.get('window').width / 2,
    // width: Dimensions.get('window').width / 2,
    height: 200,
    width: 200,
    marginBottom: 10,
    resizeMode: 'contain',
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
  forgot: {
    color: 'black',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: Dimensions.get('window').width / 1.2,
    resizeMode: 'contain',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
