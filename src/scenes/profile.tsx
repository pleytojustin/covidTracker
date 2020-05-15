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

export default class Profile extends Component {
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

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    this.setState({currentDay: this.monthArray[month] + ' ' + date + ', ' + year});

    // this.daysArray.map((item, key) => {
    //   if (key == new Date().getDay()) {
    //     this.setState({ currentDay: item.toUpperCase() });
    //   }
    // })
  }

  componentDidMount() {
    this.getCurrentTime();

    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 1,
      distanceFilter: 1,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      console.log('[INFO]', location);
      this.setState({
        locationCord: location.latitude + ' ' + location.longitude,
      });
      // Alert.alert(location);
      BackgroundGeolocation.startTask((taskKey) => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      // Actions.sendLocation(stationaryLocation);
      console.log('[INFO]', stationaryLocation);
      console.log('[INFO] Stationary');
      // this.setState({locationCord: 'stationary'});
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
      // this.setState({locationCord: 'started Service'});
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
      // this.setState({locationCord: 'service Stop'});
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status,
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });

    BackgroundGeolocation.on('background', (location) => {
      console.log('[INFO] App is in background ', location);

      // this.setState({locationCord: 'App Background'});
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
      // this.setState({locationCord: 'App foreground'});
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning,
      );
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled,
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
      );

      // you don't need to check status before start (this is just the example)
      // if (!status.isRunning) {
      //   BackgroundGeolocation.start(); //triggers start on start event
      // }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }
  pressProfile = () =>{
    this.props.navigation.navigate('AnnonymousProfile');
  }
  componentWillUnmount() {
    // unregister all event listeners

    clearInterval(this.timer);
    BackgroundGeolocation.removeAllListeners();
  }
  pressGpsHandler = async () => {
    if (!this.state.buttonGpsDisable) {
      this.setState({buttonGpsDisable: true});
      try {
        BackgroundGeolocation.stop();
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({buttonGpsDisable: false});
      try {
        BackgroundGeolocation.start();
      } catch (e) {
        console.log(e);
      }
    }
  };
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

        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pressProfile}
          style={{
            ...styles.profileBtn,
            backgroundColor: 'blue',
          }}>
          <Text style={styles.profileText}>Profile</Text>
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
    backgroundColor: '#4252fb', //GREY
    // backgroundColor: '#5fce8e', //GREEN
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
    marginTop: 1,
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
    backgroundColor: '#01BAEF', //BLUE
    // backgroundColor: '#68e0a0', // GREEN
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
    backgroundColor: '#01BAEF', //BLUE
    // backgroundColor: '#68e0a0', // GREEN
    // backgroundColor: '#fdeb92', // YELLOW
    // backgroundColor: '#ef7391', // YELLOW
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
});
