import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import {IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AnonymousProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationCord: 'start',
      buttonGpsDisable: false,
      currentTime: null,
      currentDay: null,
    };
    this.monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  }
  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    this.setState({
      currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm,
    });
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    this.setState({currentDay: this.monthArray[month] + ' ' + date + ', ' + year});

    // this.daysArray.map((item, key) => {
    //   if (key == new Date().getDate()) {
    //     this.setState({currentDay: item.toUpperCase()});
    //   }
    // });
  };
  componentDidMount() {
    this.getCurrentTime();

    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  setJSExceptionHandler = (error, isFatal) => {
    console.log('caught global error');
    handleError(error, isFatal);
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#4252fb" barStyle="light-content" />

        <View style={styles.outerDesign}>
          <View>
            <View style={styles.profileContainer}>
              <IconButton
                style={styles.profilePicture}
                icon={({size, color}) => (
                  <MaterialCommunityIcons
                    name={'account'}
                    size={Dimensions.get('window').width / 2.4}
                    color={'white'}
                  />
                )}
                onPress={this.onPress}
              />
              <View
                style={{
                  height: Dimensions.get('window').width / 5.0,
                  width: Dimensions.get('window').width / 2,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  position: 'relative',
                  alignSelf: 'center',
                  padding: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 25}}>{this.state.currentTime}</Text>
            <Text>{this.state.currentDay}</Text>
              </View>
            </View>
            <View style={styles.smallerCircle}>
              <IconButton
                style={{height: 30, width: 30}}
                icon={({size, color}) => (
                  <MaterialCommunityIcons
                    name={'check'}
                    size={30}
                    color={'white'}
                  />
                )}
                onPress={this.onPress}
              />
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={this.pressGpsHandler}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.gpsBtn,
            backgroundColor: this.state.buttonGpsDisable ? 'blue' : 'red',
          }}
          disabled={this.buttonGpsDisable}>
          <Text style={styles.gpsText} onPress={this.pressGpsHandler}>
            {this.state.buttonGpsDisable
              ? 'Enable GPS Saving'
              : 'Disable GPS Saving'}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.pop();
          }}
          style={{
            ...styles.profileBtn,
            backgroundColor: 'blue',
          }}>
          <Text style={styles.profileText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#555555', //GREY
    backgroundColor: '#5fce8e', //GREEN
    // backgroundColor: '#fbda33', //YELLOW
    // backgroundColor: '#ed4a6e', //RED
  },
  gpsBtn: {
    width: Dimensions.get('window').width / 2,
    resizeMode: 'contain',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  profileBtn: {
    width: Dimensions.get('window').width / 2,
    resizeMode: 'contain',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  gpsText: {
    color: 'white',
  },
  profileText: {
    color: 'white',
  },
  outerDesign: {
    height: Dimensions.get('window').width / 1.1,
    width: Dimensions.get('window').width,
    borderBottomLeftRadius: 100,
    borderTopEndRadius: 100,
    // backgroundColor: '#777777', //GREY
    backgroundColor: '#68e0a0', // GREEN
    // backgroundColor: '#fdeb92', // YELLOW
    // backgroundColor: '#ef7391', // YELLOW
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    height: Dimensions.get('window').width / 1.8,
    width: Dimensions.get('window').width / 1.8,
    borderRadius: 150,
    backgroundColor: '#00000000',
    borderColor: 'white',
    borderWidth: 2,
  },
  smallerCircle: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 50,
    position: 'absolute',
    marginTop: 25,
    marginStart: 100,
    backgroundColor: '#68e0a0',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
});
