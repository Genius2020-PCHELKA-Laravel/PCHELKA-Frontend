import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './src/screens/HomeScreen';
import { setNavigator } from './src/navigationRef';
import verify from './src/screens/verify';
import location from './src/screens/location';
import FrequencyScreen from './src/screens/FrequencyScreen';
import freecleaning from './src/screens/freecleaning';
import LogIn from './src/screens/LogIn';
import { Provider as AuthProvider } from './src/screens/context/AuthContext';
import { Provider as UserProvider } from './src/screens/context/UserContext';
import { exp } from 'react-native-reanimated';
import InternetScreen from './src/screens/InternetScreen';
import SettingScreen from './src/screens/SettingScreen';
import AppoitmentScreen from './src/screens/AppoitmentScreen';
import support from './src/screens/support';
import HomeScreenLogIn from './src/screens/HomeScreenLogIn';
import DateAndTime from './src/screens/DateAndTime';
import CleaningDetails from './src/screens/CleaningDetails';
import Addressdetails from './src/screens/Addressdetails';
import LoginPhoneScreen from './src/screens/LoginPhoneScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import Payment from './src/screens/Payment';
import Slidebar from './src/components/SlideBar';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginButton from './src/components/LoginButton';

// const navigator = createSwitchNavigator({
//   switch1: createStackNavigator({
//     Internet: InternetScreen,
//     HomeScreen: { navigationOptions: { headerShown: false }, screen: HomeScreen },
//     HomeScreenLogIn: { navigationOptions: { headerShown: false }, screen: HomeScreenLogIn },
//     Login: LoginPhoneScreen,
//     Verify: VerifyScreen,
//     Register: { navigationOptions: { headerShown: false }, screen: RegisterUserScreen },

//   },
//     {
//       initialRouteName: 'Internet',
//       defaultNavigationOptions: {
//         headerShown: true
//       }
//     })
// });








const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: HomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: '',
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />,
        headerRight: () => (
          <LoginButton />
        )
        ,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      };
    }
  }
);
const SettingStackNavigator = createStackNavigator(
  {
    SettingNavigator: SettingScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Settings',
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      };
    }
  }
);

const AppoitmentStackNavigator = createStackNavigator(
  {
    AppoitmentNavigator: AppoitmentScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Appoitment',
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />,

        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  HomeDrawerNavigator: {
    screen: HomeStackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  SettingDrawerNavigator: {
    screen: SettingStackNavigator,
    navigationOptions: {
      drawerLabel: 'Account Settings',
    },
  },
  AppointmentDrawerNavigator: {
    screen: AppoitmentStackNavigator,
    navigationOptions: {
      drawerLabel: 'Appitments',
    },
  }
},
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
    initialRouteName: "HomeDrawerNavigator",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    drawerPosition: 'left',
    contentComponent: props => <Slidebar {...props} />
  }
);

const LoginFlow = createStackNavigator({
  // Internet: { navigationOptions: { headerShown: false }, screen: InternetScreen },
  // HomeScreen: { navigationOptions: { headerShown: false }, screen: HomeScreen },
  HomeScreenLogIn: { navigationOptions: { headerShown: false }, screen: HomeScreenLogIn },
  Login: LoginPhoneScreen,
  Verify: VerifyScreen,
  Register: { navigationOptions: { headerShown: false }, screen: RegisterUserScreen },
  Frequency: { screen: FrequencyScreen },
},
  {
    initialRouteName: 'HomeScreenLogIn',
    defaultNavigationOptions: {
      headerShown: true
    }
  });

const MainFlow = createSwitchNavigator({
  Dashboard: { screen: AppDrawerNavigator },
  LoginFlow: { screen: LoginFlow },
});

const AppSwitchNavigator = createSwitchNavigator({
  Internet: { navigationOptions: { headerShown: false }, screen: InternetScreen },
  MainFlow: { screen: MainFlow },
});
// const navigator = createSwitchNavigator({
//   internet: { navigationOptions: { headerShown: false }, screen: Internetscreen },

//   Home: {
//     navigationOptions: { headerShown: false },
//     screen: createStackNavigator({
//       Homepage: HomeScreen,
//       loginph: loginphone,
//       ver: verify,
//       locationscreen: location,
//       frequency: Frequency,
//       cleanindetailsscreen: CleaningDetails,
//       datetimescreen: DateAndTime,
//       Payment: Payment,
//       Addresses: Addressdetails,

//     })
//   },
//   h: {
//     navigationOptions: { headerShown: false },
//     screen: createStackNavigator({

//       loginFlow: {
//         navigationOptions: { headerShown: false },
//         screen: createDrawerNavigator({
//           LogIn: { navigationOptions: { headerShown: false }, screen: HomeScreenLogIn },
//           Settingscreen: setting,
//           Appointmentscreen: appointment,
//           Freecleaningscreen: freecleaning,
//           Supportscreen: support
//         }, { contentComponent: props => <Slidebar {...props} /> }
//         )
//       },
//       locationscreen: location,
//       frequency: Frequency,
//       cleanindetailsscreen: CleaningDetails,
//       datetimescreen: DateAndTime,
//       Addresses: Addressdetails,
//       Payment: Payment,


//     })
//   }
// },
// );


const App = createAppContainer(AppSwitchNavigator);
export default () => {
  return (
    <AuthProvider><UserProvider><App ref={(navigator) => { setNavigator(navigator) }} /></UserProvider></AuthProvider>);
}

