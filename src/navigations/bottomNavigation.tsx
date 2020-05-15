import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Contact from '../scenes/contact';
import HealthCenters from '../scenes/healthCenters';
import HeatMap from '../scenes/heatMap';
import Profile from '../scenes/profile';
import CheckList from '../scenes/checkList';
import LoginHealthWorker from '../scenes/loginHealthWorker';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    HeatMap: {
      screen: HeatMap,
      navigationOptions: {
        tabBarLabel: 'Paths',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="map"
              color={tintColor}
              size={27}
            />
          </View>
        ),
      },
    },
    HealthCenters: {
      screen: HealthCenters,
      navigationOptions: {
        tabBarLabel: 'Centers',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="hospital-building"
              color={tintColor}
              size={27}
            />
          </View>
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="account-circle"
              color={tintColor}
              size={26}
            />
          </View>
        ),
      },
    },
    CheckList: {
      screen: CheckList,
      navigationOptions: {
        tabBarLabel: 'Checklist',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="format-list-checks"
              color={tintColor}
              size={27}
            />
          </View>
        ),
      },
    },
    LoginHealthWorker: {
      screen: LoginHealthWorker,
      navigationOptions: {
        tabBarLabel: 'Upload',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="upload"
              color={tintColor}
              size={27}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Profile',
    // ORIGINAL
    // activeColor: '#f0edf6',
    // inactiveColor: '#7c838a',
    // barStyle: {backgroundColor: '#1c233a'},

    // backgroundColor: '#323232', //GREY
    // backgroundColor: '#68e0a0', // GREEN
    // backgroundColor: '#fdeb92', // YELLOW
    // backgroundColor: '#ef7391', // YELLOW
    // activeColor: '#323232',

    activeColor: '#4252fb',
    inactiveColor: '#dbddeb',
    barStyle: {backgroundColor: '#01BAEF'},
  },
);

export default createAppContainer(TabNavigator);
