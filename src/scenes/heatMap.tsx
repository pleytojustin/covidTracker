import React, {Component, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Heatmap,
  Circle,
  Marker,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';

export default class HealthMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRef: createRef(),

      circle: null,
      circle2: null,
      showsUserLocation: true,
      followsUserLocation: true,
      notFollowing: false,
      initialPosition: {
        latitude: 14.6091,
        longitude: 121.0223,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      markedPositions: {
        latitude: 0,
        longitude: 0,
      },
    };
  }
  onLocationChange(position) {
    if (this.state.followsUserLocation) {
      this.setState({
        initialPosition: {
          latitude: position.nativeEvent.coordinate.latitude,
          longitude: position.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      });
    }
  }
  _reCenter() {
    this.setState({
      followsUserLocation: true,
    });
  }
  _freeMove(event) {
    this.state.followsUserLocation = false;
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          initialPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        });
      },
      (error) => {
        switch (error.code) {
          case 1:
            // code block
            break;
          case 2:
            Alert.alert('Please turn on your Location GPS.');
            // code block
            break;
          case 3:
            Alert.alert('Waiting for Location GPS to connect..');
            // code block
            break;
        }
      },
    );
  }
  mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#1d2c4d',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8ec3b9',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1a3646',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#4b6878',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#64779e',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#4b6878',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#334e87',
        },
      ],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
        {
          color: '#023e58',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#283d6a',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6f9ba5',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1d2c4d',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#023e58',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3C7680',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#304a7d',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#98a5be',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1d2c4d',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2c6675',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#255763',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#b0d5ce',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#023e58',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#98a5be',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1d2c4d',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#283d6a',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3a4762',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#0e1626',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#4e6d70',
        },
      ],
    },
  ];
  onMapReady = () => {
    this.circle2 &&
      this.circle2.setNativeProps({
        fillColor: 'rgba(255,0,0,0.5)',
        strokeColor: 'rgba(0,0,0,0.3)',
      });
    this.circle &&
      this.circle.setNativeProps({
        fillColor: 'rgba(255,0,0,0.5)',
        strokeColor: 'rgba(255,0,0,0.3)',
      });
  };
  HEATMAPOINTS = {latitude: 14.6051, longitude: 121.0223, weight: 100};
  HEATMAPOINTS2 = [
    {latitude: 14.6091, longitude: 121.0213, radius: 100, id: 1},
    {latitude: 14.6091, longitude: 121.0253, radius: 30, id: 2},
    {latitude: 14.4399926, longitude: 121.0239115, radius: 50, id: 3},
    {latitude: 14.4419926, longitude: 121.0252715, radius: 100, id: 4},
  ];
  refsArray = [];

  render() {
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    };

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1c233a" barStyle="light-content" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={this.mapStyle}
          region={this.state.initialPosition}
          onUserLocationChange={(event) => this.onLocationChange(event)}
          showsUserLocation={this.state.showsUserLocation}
          onMapReady={this.onMapReady}
          showsMyLocationButton={false}
          onTouchStart={(event) => this._freeMove(event)}>
          {this.HEATMAPOINTS2.map((marker, i) => (
            <Circle
              center={marker}
              radius={marker.radius}
              zIndex={2}
              strokeWidth={2}
              key={marker.id}
              ref={(ref) => {
                this.refsArray[i] = ref;
              }}
              onLayout={() =>
                this.refsArray[i].setNativeProps({
                  fillColor: 'rgba(255,0,0,0.5)',
                  strokeColor: 'rgba(255,0,0,0.3)',
                })
              }
            />
          ))}
        </MapView>
        <View style={styles.overlay}>
          <TouchableOpacity
            hitSlop={hitSlop}
            activeOpacity={0.7}
            style={styles.mapButton}
            onPress={() => this._reCenter()}>
            {/* <Text style={{fontWeight: 'bold', color: 'black'}}>Re-Center</Text> */}
            <IconButton
              icon={({size, color}) => (
                <MaterialCommunityIcons
                  name={'crosshairs-gps'}
                  size={size}
                  color={'black'}
                />
              )}
              onPress={this.onPress}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get('window').height,
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    opacity: 0.8,
    zIndex: 10,
  },
  overlay: {
    left: Dimensions.get('window').width / 3,
    top: Dimensions.get('window').height / 1.35,
  },
});
