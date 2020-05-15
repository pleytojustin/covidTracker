import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Login from '../scenes/login';
// import PurchaseDetail from '../scenes/purchaseDetail';
import Start from '../scenes/start';
import ForgotPassword from '../scenes/forgotPassword';
import AnnonymousProfile from '../scenes/anonymousProfile';

import HomeTab from '../navigations/bottomNavigation';

const screens = {
  Start: {
    screen: Start,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  HomeTab: {
    screen: HomeTab,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerShown: true,
      alignSelf: 'center',
      title: 'Forgot Password',
    },
  },
  AnnonymousProfile: {
    screen: AnnonymousProfile,
    navigationOptions: {
      headerShown: false,
      alignSelf: 'center',
      title: 'Profile',
    },
  },
//   PurchaseDetail: {
//     screen: PurchaseDetail,
//     navigationOptions: {
//       headerShown: true,
//       alignSelf: 'center',
//       title: 'Transaction Detail',
//     },
//   },
};

const LoginStack = createStackNavigator(screens);

export default createAppContainer(LoginStack);
