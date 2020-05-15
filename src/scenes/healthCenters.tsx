import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
  Dimensions,
  Linking,
} from 'react-native';

export default class HealthCenters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // purchaseList: [{id: 1, date: '05/23/20'}],
      healthCenters: [
        {
          id: 1,
          name: 'Makati Medical',
          address:
            '2 Amorsolo Street, Legazpi Village, Makati, 1229 Kalakhang Maynila',
          contact: '(+63)123456789',
        },
        {
          id: 2,
          name: 'Philippine General Hospital',
          address:
            'University of the Philippines Manila Taft Avenue, Manila Philippines 1000',
          contact: '(+63)123456789',
        },
        {
          id: 2,
          name: 'St Luks Medical',
          address: 'Rizal Drive cor. 32nd St. and 5th Ave., Taguig, 1634',
          contact: '(+63)123456789',
        },
        {
          id: 1,
          name: 'Makati Medical',
          address:
            '2 Amorsolo Street, Legazpi Village, Makati, 1229 Kalakhang Maynila',
          contact: '(+63)123456789',
        },
        {
          id: 2,
          name: 'Philippine General Hospital',
          address:
            'University of the Philippines Manila Taft Avenue, Manila Philippines 1000',
          contact: '(+63)123456789',
        },
        {
          id: 2,
          name: 'St Luks Medical',
          address: 'Rizal Drive cor. 32nd St. and 5th Ave., Taguig, 1634',
          contact: '(+63)123456789',
        },
      ],
      isLoading: true,
      userId: null,
      companyId: null,
      isSuperAdmin: false,
      showModal: false,
      isAscDesc: true, // true Asc, False Desc
      isCurrentlyAscDesc: true,
      reviewFilter: 'ALL',
      typeFilterList: [true, true, true, true, true, true],
    };
  }
  presstoCalllHandler = (item) => {
    console.log(item.contact);
    Linking.openURL(`tel:${item.contact}`)

    // this.props.navigation.navigate('PurchaseDetail', {
    //   url: item.data.image,
    //   type: 'cash',
    // });
  };
  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.row]}
        onPress={this.presstoCalllHandler.bind(this, item)}>
        <Text style={{fontSize: 22}}>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{item.contact}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(i, k) => k.toString()}
          data={this.state.healthCenters}
          renderItem={this.renderRow}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.isLoading}
          //     // onRefresh={this.getPurchaseList}
          //   />
          // }
          extraData={this.state.isLoading}
        />
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
  row: {
    width: Dimensions.get('window').width - 50,
    marginTop: 5,
    paddingTop: 20,
    paddingBottom: 25,
    paddingStart: 20,
    paddingEnd: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    borderColor: 'black',
    elevation: 1,
    flexDirection: 'column',
  },
  flatList: {
    paddingBottom: 0,
    marginBottom: 5,
    marginTop: 20,
  },
});
