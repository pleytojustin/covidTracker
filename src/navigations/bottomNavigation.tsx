import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Contact from '../scenes/contact';
import HealthCenters from '../scenes/healthCenters';
import HeatMap from '../scenes/heatMap';
import Info from '../scenes/info';
import TrackingToggle from '../scenes/trackingToggle';

const TabNavigator = createMaterialBottomTabNavigator(
  {
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
        // activeColor: '#f60c0d',
        inactiveColor: '#7c838a',
        barStyle: {backgroundColor: '#1c233a'},
      },
    },
    TrackingToggle: {
      screen: TrackingToggle,
      navigationOptions: {
        tabBarLabel: 'Tracking',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="map-marker"
              color={tintColor}
              size={27}
            />
          </View>
        ),
        // activeColor: '#f60c0d',
        inactiveColor: '#7c838a',
        barStyle: {backgroundColor: '#1c233a'},
      },
    },


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
        // activeColor: '#f60c0d',
        inactiveColor: '#7c838a',
        barStyle: {backgroundColor: '#1c233a'},
      },
    },
    Info: {
      screen: Info,
      navigationOptions: {
        tabBarLabel: 'Info',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="information"
              color={tintColor}
              size={27}
            />
          </View>
        ),
        // activeColor: '#f60c0d',
        inactiveColor: '#7c838a',
        barStyle: {backgroundColor: '#305da6'},
      },
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
        tabBarLabel: 'Help',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcons
              name="alert"
              color={tintColor}
              size={27}
            />
          </View>
        ),
        // activeColor: '#f60c0d',
        inactiveColor: '#616569',
        barStyle: {backgroundColor: '#305da6'},
      },
    },
  },
  {
    initialRouteName: 'HeatMap',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: {backgroundColor: '#1c233a'},
  },
);

export default createAppContainer(TabNavigator);
